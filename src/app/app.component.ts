import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'userAdministration';
  auth:AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.auth = authenticationService;
  }
  ngOnInit( ): void {
    this.auth.autoLogin();
  }

  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBbOy_KmsnyAmLdfvkrW9PjJZ4f3W3mjmI



}
