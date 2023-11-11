import {AfterViewChecked, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {UserModel} from "../domain/user.model";
import {AuthResponseDataInterface} from "../domain/authResponseData.interface";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {PostUserInfoModel} from "../domain/postUserInfo.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  authenticationService;
  hasAccount: boolean = false;
  errorMessage: string = "";

  constructor(authenticationService: AuthenticationService, private router: Router
    , private userService: UserService) {
    this.authenticationService = authenticationService;
  }

  @ViewChild('userForm') form: NgForm;
  user = {
    'email': '',
    'password': ''
  }

  onSubmit() {
    let authObs: Observable<AuthResponseDataInterface>;
    if (this.hasAccount) {
      authObs = this.authenticationService.login(this.form.value.email,
        this.form.value.password);
    } else {
      authObs = this.authenticationService.signUp(
        this.form.value.email,
        this.form.value.password);
    }

    authObs.subscribe({
        next: (resData) => {
          console.log(resData);

          this.router.navigate(['/home']);
        },
        error: (errorMessage) => {
          console.log(errorMessage);

        }
      }
    );
    this.form.reset();
  }

  // onRegister() {
  //   this.user.email = this.form.value.email;
  //   this.user.password = this.form.value.password;
  //   console.log(this.user);
  //   this.authenticationService.signUp(
  //     this.user.email, this.user.password).subscribe({
  //     next: (b) => {
  //       console.log(b)
  //       this.userService.onCreateUser({
  //           id: b.id,
  //           email: b.email
  //         }
  //       ).subscribe(value => console.log(value))
  //       this.router.navigate(['/home'])
  //     },
  //     error: (a) => console.log(a),
  //     complete: () => console.log()
  //   })
  // }
  //
  // onLogin() {
  //   this.user.email = this.form.value.email
  //   this.user.password = this.form.value.password
  //   this.authenticationService.login(
  //     this.user.email, this.user.password).subscribe(
  //     {
  //       next: (b) => {
  //         console.log(b)
  //         this.router.navigate(['/home'])
  //         this.authenticationService.hasLoaded = true;
  //       },
  //       error: (a) => {
  //         console.log(a)
  //         this.errorMessage = a
  //       }
  //       ,
  //       complete: () => console.log()
  //
  //     })
  //
  // }


}
