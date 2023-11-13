import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "../domain/profile.model";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit,OnDestroy {
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
