import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Employee } from '../model/employee';

@Injectable()
export class EmployeeService {

  private serverUrl = '/api/employees';

  constructor(private http: Http) { }

  getEmployee(id): Observable<Employee> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/" + id, options)
      .map(res => Employee.fromJson(res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}