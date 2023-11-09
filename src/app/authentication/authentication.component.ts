import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {UserModel} from "../domain/user.model";
import {AuthResponseDataInterface} from "../domain/authResponseData.interface";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  authenticationService;
  hasAccount: boolean = false;
  errorMessage: string="";

  constructor(authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService = authenticationService;
  }

  @ViewChild('userForm') form: NgForm;
  user = {
    'email': '',
    'password': ''
  }

  onSubmit() {

    if (this.hasAccount)
    {
      this.onLogin();
    }
    else {
      this.onRegister();
    }

  }

  onRegister() {
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    console.log(this.user);
    this.authenticationService.signUp(
      this.user.email, this.user.password).subscribe({
      next: (b) => {
        console.log(b)
        this.router.navigate(['/home'])
      },
      error: (a) => console.log(a),
      complete: () => console.log()
    })
  }
  onLogin() {
    this.user.email = this.form.value.email
    this.user.password = this.form.value.password
    this.authenticationService.login(
      this.user.email, this.user.password).subscribe(
      {
        next: (b) => {
          console.log(b)
          this.router.navigate(['/home'])
        },
        error: (a) => {
        console.log(a)
        this.errorMessage = a
      }
        ,
      complete: () => console.log()

    })

  }
}
