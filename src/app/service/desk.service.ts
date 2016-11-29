import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Desk } from '../model/desk';
@Injectable()
export class DeskService {

  private serverUrl = '/api/desks';

  private _desks: BehaviorSubject<Desk[]>;
  private dataStore: {
    desks: Desk[]
  }

  desks: Observable<Desk[]>

  constructor(private http: Http) {
    this.dataStore = {desks: []};
    this._desks = <BehaviorSubject<Desk[]>>new BehaviorSubject([]);

    this.desks = this._desks.asObservable();
  }

  loadAll(floorId) {
    this.http.get(`${this.serverUrl}?floorId=${floorId}&cacheBuster=${new Date().getTime()}`).map(response => response.json()).subscribe(data => {
      this.dataStore.desks = data;
      this._desks.next(Object.assign({}, this.dataStore).desks);
    }, error => console.log('Could not load building.'));
  }

  save(desk: Desk): Observable<Desk>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.serverUrl, desk, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
