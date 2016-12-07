import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ChangesetItem} from "../model/changeset-item";
import {Changeset} from "../model/changeset";
import {DeskService} from "./desk.service";
import {Desk} from "../model/desk";
import {Employee} from "../model/employee";

@Injectable()
export class ChangesetItemService {

  private serverUrl = '/api/changeset-items';

  private _changesetItems: BehaviorSubject<ChangesetItem[]>;
  private dataStore: {
    changesetItems: ChangesetItem[]
  }

  changesetItems: Observable<ChangesetItem[]>

  constructor(private http: Http,
    private deskService:DeskService
  ) {
    this.dataStore = {changesetItems: []};
    this._changesetItems = <BehaviorSubject<ChangesetItem[]>>new BehaviorSubject([]);

    this.changesetItems = this._changesetItems.asObservable();
  }

  loadAll(changesetId) {
    this.http.get(`${this.serverUrl}?changesetId=${changesetId}`).map(response => response.json())
      .map(items => {
        let changesetItems: ChangesetItem[] = [];
        for (let item of items)
        {
          let changesetItemsTemp = Object.assign(new ChangesetItem(),item);
          changesetItemsTemp.employee = Object.assign(new Employee(),item.employee);
          changesetItems.push(changesetItemsTemp);
        }
        return changesetItems;
      })
    .subscribe(data => {
      this.dataStore.changesetItems = data;
      this._changesetItems.next(Object.assign({}, this.dataStore).changesetItems);
    }, error => console.log('Could not load building.'));
  }

  getChangesetItem(changesetItemId): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + "/" + changesetItemId, options)
      .map(res => Object.assign(new ChangesetItem(),res.json()))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  setChangesetItemStatus(changesetItem): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.serverUrl, changesetItem, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  move(employee: Employee, fromDesk: Desk, toDesk: Desk, changeset: Changeset) {
    if((fromDesk && toDesk) && fromDesk.id == toDesk.id){
      console.info("Unable to move employee to same desk")
      return
    }
    if(!changeset){
      console.info("No change set selected")
      return
    }


    let item = new ChangesetItem();
    item.employee= employee;
    item.fromDesk = fromDesk
    item.toDesk = toDesk
    item.changeset = changeset
    item.status = 'DRAFT'

    this.http.put(`${this.serverUrl}`, item)
      .map(response => response.json()).subscribe(data => {
      this.dataStore.changesetItems.push(data);
      this._changesetItems.next(Object.assign({}, this.dataStore).changesetItems);
    }, error => console.log('Could not create.'));
  }

  remove(id: number) {
    this.http.delete(`${this.serverUrl}/${id}`).subscribe(response => {
      this.dataStore.changesetItems.forEach((t, i) => {
        if (t.id === id) { this.dataStore.changesetItems.splice(i, 1); }
      });

      this._changesetItems.next(Object.assign({}, this.dataStore).changesetItems);
    }, error => console.log('Could not delete.'));
  }
}
