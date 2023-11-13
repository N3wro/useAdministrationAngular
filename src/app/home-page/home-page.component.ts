import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserModel} from "../domain/user.model";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {PostUserInfoModel} from "../domain/postUserInfo.model";
import {Profile} from "../domain/profile.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy {
  userData: UserModel;
  private userSub: Subscription;
  constructor(public authService: AuthenticationService,
              public  userService:UserService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe( (result) =>
      this.userData = result
    )

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
