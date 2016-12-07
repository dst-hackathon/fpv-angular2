import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Building} from "../model/building";

@Injectable()
export class BuildingService {
  private serverUrl = '/api/buildings';
  private _buildings: BehaviorSubject<Building[]>;
  private dataStore: {
    buildings: Building[]
  }

  buildings: Observable<Building[]>

  constructor(private http: Http) {
    this.dataStore = {buildings: []};
    this._buildings = <BehaviorSubject<Building[]>>new BehaviorSubject([]);

    this.buildings = this._buildings.asObservable();
  }

  loadAll(planId) {
    this.http.get(`${this.serverUrl}?planId=${planId}`).map(response => response.json()).subscribe(data => {
      this.dataStore.buildings = data;
      this._buildings.next(Object.assign({}, this.dataStore).buildings);
    }, error => console.log('Could not load building.'));
  }

  get(id:number) {
    return this.buildings.map(list=> list.find(b => b.id === id))
  }
}
