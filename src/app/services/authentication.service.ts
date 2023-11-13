import {AfterViewChecked, AfterViewInit, EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserModel} from "../domain/user.model";
import {catchError, Observable, throwError, tap, BehaviorSubject, ReplaySubject, map, of} from "rxjs";
import {AuthResponseDataInterface} from "../domain/authResponseData.interface";
import {Router} from "@angular/router";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-file-loader";
import {UserService} from "./user.service";
import {Profile} from "../domain/profile.model";
import {take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<UserModel>(null)
  private _hasLoaded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {

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
          let profile = this.handleAuth(resData);
          this.userService.onCreateUser(new Profile(profile.id, profile.email));
          this.isAdmin(resData).subscribe(
            {
              next: (resData) => {

                resData ? this.router.navigate(['/dashboard']) : this.router.navigate(['/home'])

              },
              error: (errorMessage) => {

                this.router.navigate(['/home'])
              }
            }
          )
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

            this.handleAuth(resData);
            this.isAdmin(resData).subscribe(
              {
                next: (resData) => {

                  resData ? this.router.navigate(['/dashboard']) : this.router.navigate(['/home'])

                },
                error: (errorMessage) => {

                  this.router.navigate(['/home'])
                }
              }
            )

          }
        )
      )

  }

  private handleAuth(resData: any) {
    const user = new UserModel(
      resData.localId,
      resData.email,
      true,
      resData.idToken,
      +resData.expiresIn
    );
    this.user.next(user);
    this.autoLogout(+user.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
    return user;
  }

  public autoLogin() {
    let loadUser: {
      _id: string;
      _email: string;
      _registered: boolean;
      _refreshToken: string;
      _expiresIn: number;
    }
    loadUser = JSON.parse(localStorage.getItem('userData'));

    if (!loadUser) {
      return null;
    }


    const loadedUser = new UserModel(loadUser._id,
      loadUser._email,
      loadUser._registered,
      loadUser._refreshToken,
      loadUser._expiresIn)

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(
        loadedUser.expiresIn * 1000)

    }

    return this.user.asObservable();
  }

  private isAdmin(resData: any) {


    return this.http.get<{ email: string }>
    ("https://httppracticeyeah-default-rtdb.europe-west1.firebasedatabase.app/admin/" + resData.localId + ".json")
      .pipe(
        take(1),
        map(
          (resData) => {
            return resData.email != null;
          }
        ),
        catchError(err => {

          return of(false);
        }),)
  }


  logout() {
    this.user.next(null);
    localStorage.removeItem('userData')
    this.router.navigate(['/auth'])
    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
    this.tokenExpirationTimeout = null;
  }


  private autoLogout(expiresIn
                       :
                       number
  ) {
    this.tokenExpirationTimeout = setTimeout(() => {
      this.logout();
      alert("Your session has been expired")
    }, expiresIn);
  }


  private handleError(errorResp
                        :
                        HttpErrorResponse
  ) {
    let errorMessage = 'an unkown Error occured';


    if (errorResp.message === 'INVALID_LOGIN_CREDENTIALS') {
      errorMessage = 'password or email is not correct.';
    }

    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email exists"
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'password or email is not correct.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }


}
