import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Building } from '../model/building';

@Injectable()
export class BuildingSelectorService {

    private serverUrl = '/api/buildings';

    constructor(private http: Http) { }

    getBuildingList(planId): Observable<Building[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.serverUrl + '?planId=' + planId, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
