import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ChangesetItem} from "../model/changeset-item";
import {Employee} from "../model/employee";

@Injectable()
export class PlanHolderService {

  private serverUrl = '/api/changeset-items';

  constructor(private http: Http) { }

   getChangesetItemsDeskNull(changeID): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + '?changesetId=' + changeID, options)
      .map(res => {
        let changesetItems: ChangesetItem[] = [];
        for (let item of res.json())
        {
           if (item.toDesk == null)
           {
             let changesetItemsTemp = Object.assign(new ChangesetItem(),item);
             changesetItemsTemp.employee = Object.assign(new Employee(),item.employee);
             changesetItems.push(changesetItemsTemp);
           }
        }
        return changesetItems;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
   getChangesetItemsDesk(changeID): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl + '?changesetId=' + changeID, options)
      .map(res => {
        let changesetItems: ChangesetItem[] = [];
        for (let item of res.json())
        {
           let changesetItemsTemp = Object.assign(new ChangesetItem(),item);
           changesetItemsTemp.employee = Object.assign(new Employee(),item.employee);
           changesetItems.push(changesetItemsTemp);
        }
        return changesetItems;
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
