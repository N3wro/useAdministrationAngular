import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;

    });
  }
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
