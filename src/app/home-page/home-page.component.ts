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
  userData: Profile[];
  private userSub: Subscription;
  constructor(public authService: AuthenticationService,
              public  userService:UserService) {
  }

  ngOnInit() {
    this.userSub = this.userService
      .profileChanged
      .subscribe(
        (user:Profile[]) => {
        this.userData=user;

    });

    this.userData = this.userService.users;
    console.log(this.userData);
  }

  onFetchUser() {
   this.userService.fetchUser().subscribe(
     response =>
     {
       console.log(response);
       this.userData= response;
     }

   );
   console.log(this.userData)
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
