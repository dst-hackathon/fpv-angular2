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
    selectedDesk: Desk
  }

  desks: Observable<Desk[]>

  constructor(private http: Http) {
    this.dataStore = {desks: [], selectedDesk: null };
    this._desks = <BehaviorSubject<Desk[]>>new BehaviorSubject([]);

    this.desks = this._desks.asObservable();
  }

  loadAll(floorId) {
    this.http.get(`${this.serverUrl}?floorId=${floorId}&cacheBuster=${new Date().getTime()}&size=10000`).map(response => response.json()).subscribe(data => {
      this.dataStore.desks = data;
      this._desks.next(Object.assign({}, this.dataStore).desks);
    }, error => console.log('Could not load desks.'));
  }

  save(desk: Desk) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.serverUrl, desk, options)
      .map((response: Response) => response.json())
      .subscribe(data => {
        this.dataStore.desks.push(data);
        this._desks.next(Object.assign({}, this.dataStore).desks);
      }, error => console.log('Could not save desk.'));
  }

  remove(deskId: number){
    this.http.delete(`${this.serverUrl}/${deskId}`).subscribe(res => {
      this.dataStore.desks.forEach((d, i) => {
        if (d.id === deskId) { this.dataStore.desks.splice(i, 1); }
      });

      this._desks.next(Object.assign({}, this.dataStore).desks);

      console.log('Complete delete desk',deskId)
    })
  }

  get(id:number) {
    return this.desks.map(desks=> desks.find(desk => desk.id === id))
  }

  setSelectedDesk(desk: Desk) {
    this.dataStore.selectedDesk = desk;
  }

  hasSelectedDesk() {
    return this.dataStore.selectedDesk ? true : false;
  }
}
