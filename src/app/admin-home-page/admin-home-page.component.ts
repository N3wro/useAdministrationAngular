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


    this.userData = this.route.snapshot.data['userData'];

    this.userData = this.userData.filter((item) => item.id!=this.authService.user.value.id )
    this.success.wasSuccessful = false;
    this.success.message="";
  }

  onFetchUser() {
    this.userService.fetchUser().subscribe(
      response => {

        this.userData = response.filter((item) => item.id!=this.authService.user.value.id );
      }
    );

  }

  ngOnDestroy() {
    //this.userSub.unsubscribe();
  }



}
