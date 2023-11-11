import {AfterViewChecked, AfterViewInit, EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../domain/user.model";
import {catchError, Observable, throwError, tap, BehaviorSubject, ReplaySubject} from "rxjs";
import {AuthResponseDataInterface} from "../domain/authResponseData.interface";
import {Router} from "@angular/router";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  user = new BehaviorSubject<UserModel>(null)
  private _hasLoaded: boolean = false;
  constructor(private http: HttpClient, private router: Router) {

  }

  tokenExpirationTimeout;

  signUp(email, password): Observable<any> {
    return this.http
      .post<AuthResponseDataInterface>
      ("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBbOy_KmsnyAmLdfvkrW9PjJZ4f3W3mjmI"
        ,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError),
        tap(resData => {
          const user = new UserModel(
            resData.localId,
            resData.email,
            true,
            resData.idToken,
            +resData.expiresIn
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user))
          this.autoLogout(user.expiresIn)
        })
      )

  }

  login(email, password): Observable<any> {
    return this.http
      .post<AuthResponseDataInterface>
      ("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBbOy_KmsnyAmLdfvkrW9PjJZ4f3W3mjmI"
        ,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
            const user = new UserModel(
              resData.localId,
              resData.email,
              true,
              resData.idToken,
              +resData.expiresIn
            );
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user))
            this.autoLogout(user.expiresIn)
          }
        )
      )

  }

  public autoLogin() {
   let  loadUser : {
     id: string;
     email: string;
     registered: boolean;
     _token: string;
     _tokenExpirationDate: string;
    }
    loadUser = JSON.parse(localStorage.getItem('userData'));
    console.log(loadUser);
   if (!loadUser)
   {
     return null;
   }
    console.log(loadUser);

   const loadedUser = new UserModel(loadUser.id,
     loadUser.email,
     loadUser.registered,
     loadUser._token,
     +loadUser._tokenExpirationDate)

    if (loadedUser.token) {


      this.user.next(loadedUser);
      this.autoLogout(
        new Date(loadUser._tokenExpirationDate).getTime() -
        new Date().getTime())

    }

    return  this.user.asObservable();
  }


  get hasLoaded(): boolean {
    return this._hasLoaded;
  }


  set hasLoaded(value: boolean) {
    this._hasLoaded = value;
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['../'])
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
    this.tokenExpirationTimeout = null;
  }

  private autoLogout(expiresIn: number) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.logout();
      alert("Your session has been expired")
    }, expiresIn*3600);
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMessage = 'an unkown Error occured';

    if (errorResp.error.error.message.includes("WEAK_PASSWORD")) {
      errorMessage = 'password is to weak'
    } else {
      switch (errorResp.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = "email exists"

      }
    }
    return throwError(() => new Error(errorMessage));
  }


}
