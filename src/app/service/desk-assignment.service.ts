import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import { Plan } from '../model/plan';
import { Desk } from '../model/desk';
import { Employee } from '../model/employee';
import { DeskAssignment } from '../model/desk-assignment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Building} from "../model/building";

@Injectable()
export class DeskAssignmentService {

  private serverUrl = '/api/desk-assignments';

  private _deskAssignments: BehaviorSubject<DeskAssignment[]>;
  private dataStore: {
    deskAssignments: DeskAssignment[]
  }

  deskAssignments: Observable<DeskAssignment[]>

  constructor(private http: Http) {
    this.dataStore = {deskAssignments: []};
    this._deskAssignments = <BehaviorSubject<DeskAssignment[]>>new BehaviorSubject([]);

    this.deskAssignments = this._deskAssignments.asObservable();
  }

  loadAll(floorId) {
    this.http.get(`${this.serverUrl}?floorId=${floorId}`).map(response => response.json()).subscribe(data => {
      this.dataStore.deskAssignments = data;
      this._deskAssignments.next(Object.assign({}, this.dataStore).deskAssignments);
    }, error => console.log('Could not load desk assignments.'));
  }

  get(desk: Desk) : Observable<DeskAssignment>{
    return this.deskAssignments.map(list=> list.find(item => item.desk.id === desk.id))
  }
}
