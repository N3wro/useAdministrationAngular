import {
  ActivatedRouteSnapshot, CanActivateFn,
  ResolveFn,
  Route, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {Observable, of, switchAll, switchMap} from 'rxjs';
import {map, tap, take} from 'rxjs/operators';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {UserModel} from "../domain/user.model";
import {resolve} from "@angular/compiler-cli";


export const adminAuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService)

  let isAuthenticated: boolean;
  let currentUser: any;


  authService.user.pipe(
    take(1),
    map(user => {
      if (!user) {
        return {auth: false}
      } else {
        return {user: user, auth: true}
      }
    })
  ).subscribe(value => {

      isAuthenticated = value.auth
      if (isAuthenticated)
        currentUser = value.user;
    }
  );

  if (!isAuthenticated)
    return router.createUrlTree(['/auth']);


  return authService.hasAdminRole? true :  router.createUrlTree(['/home']);
}

