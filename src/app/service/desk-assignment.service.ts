import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import {Desk} from "../model/desk";
import {DeskAssignment} from "../model/desk-assignment";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

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
    this.http.get(`${this.serverUrl}?floorId=${floorId}`).map(response => response.json())
      .map(objects=> {
        let list: DeskAssignment[] = [];
        for (let obj of objects)
        {
          list.push(DeskAssignment.fromJson(obj));
        }
        return list;
      })
      .subscribe(data => {
      this.dataStore.deskAssignments = data;
      this._deskAssignments.next(Object.assign({}, this.dataStore).deskAssignments);
    }, error => console.log('Could not load desk assignments.'));
  }

  get(desk: Desk) : Observable<DeskAssignment>{
    return this.deskAssignments.map(list=> list.find(item => item.desk.id === desk.id))
  }

  getDesk(employeeId,planId): Observable<Desk> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.serverUrl}/search/desk?employeeId=${employeeId}&planId=${planId}`, options)
      .map(res => {
        if(!res.text()){
          return null;
        }

        return Desk.fromJson(res.json())
      })
  }

  findByDesk(desk: Desk) : DeskAssignment[] {
    let list:DeskAssignment[] = []
    this.dataStore.deskAssignments.forEach((t, i) => {
      if (t.desk && t.desk.id === desk.id) {
        list.push(t)
      }
    });

    return list;
  }
}
