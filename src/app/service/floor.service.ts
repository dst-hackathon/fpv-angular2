import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Floor } from '../model/floor';

@Injectable()
export class FloorService {

  private serverUrl = '/api/floors';

  private _floors: BehaviorSubject<Floor[]>;
  private dataStore: {
    floors: Floor[]
  }

  floors: Observable<Floor[]>

  constructor(private http: Http) {
    this.dataStore = {floors: []};
    this._floors = <BehaviorSubject<Floor[]>>new BehaviorSubject([]);

    this.floors = this._floors.asObservable();
  }

  loadAll(buildingId) {
    this.http.get(`${this.serverUrl}?buildingId=${buildingId}`).map(response => response.json()).subscribe(data => {
      this.dataStore.floors = data;
      this._floors.next(Object.assign({}, this.dataStore).floors);
    }, error => console.log('Could not load building.'));
  }

  getFloor(id): Observable<Floor> {
    return this.floors.map(floors => floors.find(item => item.id === id));
  }

  getFloorImage(floorId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/" + floorId+"/image", options)
      .map(res => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
