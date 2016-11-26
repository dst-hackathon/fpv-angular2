import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Floor } from '../model/floor';

@Injectable()
export class FloorService {

  private serverUrl = '/api/floors';

  constructor(private http: Http) { }

  getFloorList(buildingId): Observable<Floor[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + '?buildingId=' + buildingId, options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getFloor(floorId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/" + floorId, options)
      .map(res => Floor.fromJson(res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
