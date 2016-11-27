import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  private serverUrl = '/api/authentication';

  loginUser: Observable<any>
  private _loginUser: BehaviorSubject<any>;
  private dataStore: {
    loginUser
  }

  constructor(private http: Http) {
    this.dataStore = { loginUser: null }
    this._loginUser = <BehaviorSubject<any>> new BehaviorSubject(null);
    this.loginUser = this._loginUser.asObservable();
  }

  login(username,password,rememberMe): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('j_username', username);
    urlSearchParams.append('j_password', password);
    urlSearchParams.append('remember-me', rememberMe);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverUrl, body, options)
      .map((res: Response) => {
        this.loadLoginAccount()

        return res
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  loadLoginAccount(){
    this.getAccount().subscribe()
  }

  getAccount():Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get("/api/account",options).map((res:Response)=> {
      let loginUser = res.json()

      this.dataStore['loginUser']= loginUser
      this._loginUser.next(loginUser);
    })
  }

  logout(): Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post("/api/logout",options).map((res:Response)=> {
      this.dataStore['loginUser'] = null
      this._loginUser.next(null);
    })
  }

}
