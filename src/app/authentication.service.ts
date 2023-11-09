import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "./domain/user.model";
import {catchError, Observable, throwError, tap, BehaviorSubject} from "rxjs";
import {AuthResponseDataInterface} from "./domain/authResponseData.interface";
import {Router} from "@angular/router";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<UserModel>(null)

  constructor(private http: HttpClient, private router: Router) {

  }

  tokenExpirationTimeout;

  signUp(email, password): Observable<any> {
    return this.http
      .post<AuthResponseDataInterface>
      ("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbOy_KmsnyAmLdfvkrW9PjJZ4f3W3mjmI"
        ,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(catchError(this.handleError)
      )

  }

  login(email, password): Observable<any> {
    return this.http
      .post<AuthResponseDataInterface>
      ("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbOy_KmsnyAmLdfvkrW9PjJZ4f3W3mjmI"
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
              resData.password,
              true,
              resData.idToken,
              +resData.expiresIn
            );
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user))
            this.autoLogout(10000)
          }
        )
      )

  }

  private autoLogin() {
   let  loadUser : {
     id: number;
     email: string;
     password: string;
     registered: boolean;
     _token: string;
     _tokenExpirationDate: Date;
    }

    loadUser = JSON.parse(localStorage.getItem('userData'));

   if (!loadUser._token)
   {
     return;
   }

   this.user.next(new UserModel(
     loadUser.id,
     loadUser.email,
     loadUser.password,
     loadUser.registered,
     loadUser._token,
     loadUser._tokenExpirationDate.getMilliseconds()- Date.now()
   )) ;

   this.autoLogout(
     loadUser._tokenExpirationDate.getMilliseconds()- Date.now())

  }

  private logout() {
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
    }, expiresIn);
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

  getUserData() {
    return this.user.asObservable();
  }

  getAuthorizationToken():string {
    return this.user.getValue().refreshToken;
  }
}
