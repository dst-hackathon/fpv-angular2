import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private serverUrl = '/api/authentication';

  constructor(private http: Http) { }


  login(username,password): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('j_username', username);
    urlSearchParams.append('j_password', password);
    urlSearchParams.append('remember-me', 'true');
    let body = urlSearchParams.toString()

    return this.http.post(this.serverUrl, body, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAccount(): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get("/api/account",options).map((res:Response)=> res.json())
  }

  logout(): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post("/api/logout",options).map((res:Response)=> res)
  }

}
