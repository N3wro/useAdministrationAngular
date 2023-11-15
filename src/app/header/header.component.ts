import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {Profile} from "../domain/profile.model";
import {UserModel} from "../domain/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  private currUser: UserModel;
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.currUser = user;
    });

    if (this.router.url=='/auth')
    {
      this.authService.logout();
    }
  }
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router:Router
  ) {}
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  removeUser() {
    forkJoin({
      requestOne: this.userService.removeUserFromAuthentication(this.currUser.token()),
      requestTwo: this.userService.removeProfile(this.currUser.id),

    })
      .subscribe({
        next: (resData) => {
          // this.success.wasSuccessful=true;
          // this.success.message='removed successfully';
          this.router.navigate(['/auth']);

        },
        error: (errorMessage) => {
           // this.success.wasSuccessful=false;
          alert(errorMessage.message);
        }
      });
  }
}
