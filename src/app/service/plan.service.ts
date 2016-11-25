import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Plan } from '../model/plan';

@Injectable()
export class PlanService {

  private serverUrl = '/api/plans/';

  constructor(private http: Http) { }

  getAllPlans(): Observable<Plan[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl, options)
      .map(res => {
          let planList: Plan[] = [];
          for(let obj of res.json())
          {
              planList.push(Plan.fromJson(obj));
          }
          return planList;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
