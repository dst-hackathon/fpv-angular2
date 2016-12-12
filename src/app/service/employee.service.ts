import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Employee } from '../model/employee';
import {DeskAssignment} from "../model/desk-assignment";
import {ChangesetItem} from "../model/changeset-item";

@Injectable()
export class EmployeeService {

  private serverUrl = '/api/employees';

  private _employees: BehaviorSubject<Employee[]>;
  private dataStore: {
    employees: Employee[]
  }

  employees: Observable<Employee[]>

  constructor(private http: Http) {
    this.dataStore = {employees: []};
    this._employees = <BehaviorSubject<Employee[]>>new BehaviorSubject([]);

    this.employees = this._employees.asObservable();
  }

  loadAll() {
    this.http.get(`${this.serverUrl}`).map(response => response.json()).subscribe(data => {
      this.dataStore.employees = data;
      this._employees.next(Object.assign({}, this.dataStore).employees);
    }, error => console.log('Could not load building.'));
  }

  load(id){
    this.http.get(`${this.serverUrl}/${id}`)
      .map(res => Object.assign(new Employee(),res.json())).subscribe(data=>{
      let notFound = true;

      this.dataStore.employees.forEach((item, index) => {
        if (item.id === data.id) {
          this.dataStore.employees[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.employees.push(data);
      }

      this._employees.next(Object.assign({}, this.dataStore).employees);
    })
  }

  getEmployee(id): Observable<Employee> {
    this.load(id)
    return this.employees.map(emps=> emps.find(emp => emp.id === id))
  }

  getEmployeeByCode(code): Observable<Employee> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/search/code?code=" + code, options)
      .map(res => Object.assign(new Employee(),res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getEmployeeByName(name): Observable<Employee[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.serverUrl}/search?name=${name}`, options)
      .map(res => {
        let list: Employee[] = [];
        for (let item of res.json())
        {
          list.push(Employee.fromJson(item));
        }
        return list;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  static getEmployee(deskAssignment: DeskAssignment, changesetItem: ChangesetItem) :Employee{
    if(changesetItem && changesetItem.employee){
      return changesetItem.employee
    }else if(deskAssignment && deskAssignment.employee){
      return deskAssignment.employee
    }

    return null;
  }
}
