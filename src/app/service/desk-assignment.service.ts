import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Plan } from '../model/plan';
import { Desk } from '../model/desk';
import { Employee } from '../model/employee';
import { DeskAssignment } from '../model/desk-assignment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DeskAssignmentService {

  private serverUrl = '/api/desk-assignments';

  constructor(private http: Http) { }

  getAllDeskAssignments(): Observable<DeskAssignment[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl, options)
      .map(res => {
        let deskAssignmentList: DeskAssignment[] = [];
        for(let responseItem of res.json()){
          deskAssignmentList.push(DeskAssignment.fromJson(responseItem));
        }
        return deskAssignmentList;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
