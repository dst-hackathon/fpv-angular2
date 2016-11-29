import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Desk } from '../model/desk';
@Injectable()
export class DeskService {

  private serverUrl = '/api/desks';

  constructor(private http: Http) { }

  getDesks(floorId): Observable<Desk[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get("/api/desks?floorId="+floorId+"&cacheBuster="+new Date().getTime(), options)
      .map((res: Response) => {
        let desks: Desk[] = [];
        for (let obj of res.json()) {
          desks.push(Desk.fromJson(obj));
        }

        return desks;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  save(desk: Desk): Observable<Desk>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl, desk, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
