import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Floor} from "../model/floor";

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
    this.http.get(`${this.serverUrl}?buildingId=${buildingId}`).map(response => {
      let floors = response.json()

      for (var i = 0; i < floors.length; i++) {
        floors[i] = Object.assign(new Floor(),floors[i])
      }

      return floors
    }).subscribe(data => {
      this.dataStore.floors = data;
      this._floors.next(Object.assign({}, this.dataStore).floors);
    }, error => console.log('Could not load floors.'));
  }

  getFloor(id): Observable<Floor> {
    return this.floors.map(floors => floors.find(item => item.id === id));
  }

  loadFloorImage(floor:Floor){
    //cache
    if(floor.image){
      return
    }

    this.http.get(`${this.serverUrl}/${floor.id}/image`).map(res => res.json()).subscribe( floorImage => {
      Object.assign(floor,floorImage)
    }, error => console.log('Could not load floor image.',floor));

  }

}
