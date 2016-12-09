import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable, BehaviorSubject} from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {Changeset} from "../model/changeset";

@Injectable()
export class ChangesetService {

    private serverUrl = '/api/changesets';

    private _selectedChangeset: BehaviorSubject<Changeset>;
    private _changesets: BehaviorSubject<Changeset[]>;
    private dataStore: {
      changesets : Changeset[]
      selectedChangeset: Changeset
    }

    selectedChangeset: Observable<Changeset>
    changesets: Observable<Changeset[]>

    constructor(private http: Http) {
      this.dataStore = {selectedChangeset: null,changesets:[]};

      this._selectedChangeset = <BehaviorSubject<Changeset>>new BehaviorSubject(null);
      this._changesets = <BehaviorSubject<Changeset[]>>new BehaviorSubject([]);

      this.selectedChangeset = this._selectedChangeset.asObservable();
      this.changesets = this._changesets.asObservable();
    }

    loadAll(planId) {
      this.http.get(`${this.serverUrl}?planId=${planId}`).map(response => response.json()).subscribe(data => {
        this.dataStore.changesets = data;
        this._changesets.next(Object.assign({}, this.dataStore).changesets);
      }, error => console.log('Could not load changesets.'));
    }

    setSelectedChangeset(changeset: Changeset) {
      this.dataStore.selectedChangeset = changeset;
      this._selectedChangeset.next(Object.assign({}, this.dataStore).selectedChangeset);
    }


    getChangesetList(planId): Observable<Changeset[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.serverUrl + '?planId=' + planId, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getChangeset(changesetId): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.serverUrl + '/' + changesetId, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  getChangesetItems(changesetId: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get("/api/changeset-items?changesetId=" + changesetId, options)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    getChangesetByEffectiveDate(effectiveDate): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.serverUrl + '/search?effectiveDate='+effectiveDate, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    save(changeset): Observable<any>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(this.serverUrl, changeset, options)
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
