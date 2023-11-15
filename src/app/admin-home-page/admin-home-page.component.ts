import {Component, OnDestroy, OnInit} from '@angular/core';
import {Profile} from "../domain/profile.model";
import {forkJoin, Subscription} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit, OnDestroy {
  userData: Profile[];
  private userSub: Subscription;
   success: {
    wasSuccessful: boolean;
    message: string;
  } = {
    wasSuccessful: true,
    message: 'Operation erfolgreich durchgeführt.'
  };

  constructor(public authService: AuthenticationService,
              public userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.userSub = this.userService
    //   .profileChanged
    //   .subscribe(
    //     (users:Profile[]) => {
    //       this.userData=users;
    //
    //     });

    // this.userData = this.userService.users;

    this.userData = this.route.snapshot.data['userData'];
    this.success.wasSuccessful = false;
    this.success.message="";
  }

  onFetchUser() {
    this.userService.fetchUser().subscribe(
      response => {
        console.log(response);
        this.userData = response;
      }
    );
    console.log(this.userData)
  }

  ngOnDestroy() {
    //this.userSub.unsubscribe();
  }

  removeUser(user : Profile) {
    forkJoin({
      requestOne: this.userService.removeUserFromAuthentication(user.idToken),
      requestTwo: this.userService.removeProfile(user.id),

    })
      .subscribe({
        next: (resData) => {
          this.success.wasSuccessful=true;
          this.success.message='removed successfully';

        },
        error: (errorMessage) => {
          this.success.wasSuccessful=false;
          this.success.message=errorMessage.message;
        }
      });
  }

}
