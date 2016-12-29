import {Injectable, getPlatform} from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Plan } from '../model/plan';

@Injectable()
export class PlanService {

  private serverUrl = '/api/plans';

  private _selected: BehaviorSubject<Plan>;
  private _plans: BehaviorSubject<Plan[]>;

  selected: Observable<Plan>
  plans: Observable<Plan[]>

  private dataStore: {
    selected: Plan,
    plans: Plan[]
  }

  constructor(private http: Http) {
    this.dataStore = {
      selected: null,
      plans: []
    };

    this._selected = <BehaviorSubject<Plan>>new BehaviorSubject(null);
    this.selected = this._selected.asObservable();

    this._plans = <BehaviorSubject<Plan[]>>new BehaviorSubject([]);
    this.plans = this._plans.asObservable();
  }

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

  getPlan(planId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl +"/"+ planId, options)
      .map(res => Plan.fromJson(res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  loadAll() {
    this.http.get(`${this.serverUrl}`).map(res => {
      let planList: Plan[] = [];
      for(let obj of res.json())
      {
        planList.push(Plan.fromJson(obj));
      }
      return planList;
    }).subscribe(data => {
      this.dataStore.plans = data;
      this._plans.next(Object.assign({}, this.dataStore).plans);
    }, error => console.log('Could not load plans.'));
  }

  get(id:number) {
    return this.plans.map(plans=> plans.find(plan => plan.id == id))
  }

  getSelected(){
    return this.dataStore.selected
  }

  setSelected(plan: Plan) {
    this.dataStore.selected = plan;
    this._selected.next(Object.assign({}, this.dataStore).selected);
  }

}
