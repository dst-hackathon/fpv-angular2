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
import {DeskAssignment} from "../model/desk-assignment";
import {DeskAssignmentService} from "./desk-assignment.service";

@Injectable()
export class ChangesetItemService {

  private serverUrl = '/api/changeset-items';

  private _changesetItems: BehaviorSubject<ChangesetItem[]>;
  private _focusChangesetItem: BehaviorSubject<ChangesetItem>;
  public dataStore: {
    changesetItems: ChangesetItem[]
    focusChangesetItem: ChangesetItem
  }

  changesetItems: Observable<ChangesetItem[]>
  focusChangesetItem: Observable<ChangesetItem>

  constructor(private http: Http,
    private deskService:DeskService,
    private deskAssignmentService:DeskAssignmentService
  ) {
    this.dataStore = {changesetItems: [],focusChangesetItem:null};
    this._changesetItems = <BehaviorSubject<ChangesetItem[]>>new BehaviorSubject([]);
    this._focusChangesetItem = <BehaviorSubject<ChangesetItem>>new BehaviorSubject(null);

    this.changesetItems = this._changesetItems.asObservable();
    this.focusChangesetItem = this._focusChangesetItem.asObservable();
  }

  loadAll(changesetId) {
    this.http.get(`${this.serverUrl}?changesetId=${changesetId}`).map(response => response.json())
      .map(items => {
        let changesetItems: ChangesetItem[] = [];
        for (let item of items)
        {
          changesetItems.push(ChangesetItem.fromJson(item));
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

  move(employee: Employee, fromDesk: Desk, toDesk: Desk, changeset: Changeset,previousChangesetItem: ChangesetItem) {
    let items = this.build(employee, fromDesk, toDesk, changeset, previousChangesetItem);

    if(items){
      for (let item of items) {
        this.saveItem(item);
      }
    }
  }

  public build(employee: Employee, fromDesk: Desk, toDesk: Desk, changeset: Changeset,previousChangesetItem: ChangesetItem) :ChangesetItem[]{
    let list = []

    if((fromDesk && toDesk) && fromDesk.id == toDesk.id){
      console.info("Unable to move employee to same desk")
      return null
    }
    if(!changeset){
      console.info("No change set selected")
      return null
    }

    if(previousChangesetItem){
      previousChangesetItem.toDesk = toDesk

      list.push(previousChangesetItem)
      return list
    }

    let item = new ChangesetItem();
    item.employee = employee;
    item.changeset = changeset
    item.fromDesk = fromDesk
    item.toDesk = toDesk

    list.push(item)

    let existingItems = this.findByToDesk(toDesk);
    if(existingItems && existingItems.length != 0){
      for (let item of existingItems) {
        item.toDesk = null
        list.push(item)
      }
    }else{
      let existingDAList = this.deskAssignmentService.findByDesk(toDesk)
      if(existingDAList){
        for (let da of existingDAList) {
          let item = new ChangesetItem();
          item.changeset = changeset
          item.employee = employee
          item.fromDesk = da.desk
          item.toDesk = null
          list.push(item)
        }
      }
    }

    return list;
  }

  public saveItem(item: ChangesetItem) {
    item.status = 'DRAFT'

    let isFromAndToDeskIsNull:boolean = item.fromDesk == null && item.toDesk == null

    // delete item from == to desk
    var hasSameDeskId = item.fromDesk && item.toDesk && item.fromDesk.id == item.toDesk.id;
    if(isFromAndToDeskIsNull || hasSameDeskId){
      this.remove(item.id)
    }

    this.http.put(`${this.serverUrl}`, item)
      .map(response => ChangesetItem.fromJson(response.json())).subscribe(data => {

      //remove
      this.dataStore.changesetItems.forEach((t, i) => {
        if (t.id === data.id) {
          this.dataStore.changesetItems.splice(i, 1);
        }
      });

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

  get(desk: Desk) : Observable<ChangesetItem> {
    return this.changesetItems.map(list=> list.find(item => item.toDesk && item.toDesk.id === desk.id))
  }

  findByFromDesk(desk: Desk) : ChangesetItem[] {
    let list:ChangesetItem[] = []
    this.dataStore.changesetItems.forEach((t, i) => {
      if (t.fromDesk && t.fromDesk.id === desk.id) {
        list.push(t)
      }
    });

    return list;
  }
  findByToDesk(desk: Desk) : ChangesetItem[] {
    let list:ChangesetItem[] = []
    this.dataStore.changesetItems.forEach((t, i) => {
      if (t.toDesk && t.toDesk.id === desk.id) {
        list.push(t)
      }
    });

    return list;
  }

  setFocusChangesetItem(item: ChangesetItem) {
    this.dataStore.focusChangesetItem= item;
    this._focusChangesetItem.next(Object.assign({}, this.dataStore).focusChangesetItem);
  }
}
