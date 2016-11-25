import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Plan } from '../model/plan';

@Injectable()
export class PlanDialogService {

  private serverUrl = '/api/plans';

  constructor(private http: Http) { }

  getPlan(planId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/" + planId, options)
      .map(res => Plan.fromJson(res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getBuildings(): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get("/api/buildings",options).map((res:Response)=> res.json())
  }
}
