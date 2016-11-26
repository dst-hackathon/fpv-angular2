import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Plan } from '../model/plan';
import { Changeset } from '../model/changeset';
import { ChangesetItem } from '../model/changesetitem';

@Injectable()
export class PlanHolderService {

  private serverUrl = '/api/changesets';
  private serverUrl2 = '/api/changeset-items';

  constructor(private http: Http) { }

   getChangesetItemsDeskNull(changeID): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.serverUrl2 + '?changesetId=' + changeID, options)
      .map(res => {
        let changesetItems: ChangesetItem[] = [];
        for (let item of res.json())
        {
           if (item.toDesk == null)
           {
            changesetItems.push(ChangesetItem.fromJson(item));
           }
        }
        return changesetItems; 
      })
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
