import {
  ActivatedRouteSnapshot, CanActivateFn,
  ResolveFn,
  Route, Router, RouterStateSnapshot
} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {Observable, switchAll} from 'rxjs';
import {map, tap, take} from 'rxjs/operators';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";


export const adminAuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService)
  let isAuthenticated: boolean;
  let currentUserId: string
  let allowedEmails: string[] = ["Yv6IDUBBzFUiSCcw46OG9SCeZfR2"];


  authService.user.pipe(
    take(1),
    map(user => {
      if (!user) {
        return {id: "", auth: false}
      } else {
        return {id: user.id, auth: true}
      }
    })
  ).subscribe(value => {
      isAuthenticated = value.auth
      currentUserId = value.id
    }
  );

  if (!isAuthenticated)
    return router.createUrlTree(['/auth'])


  return allowedEmails.includes(currentUserId) ? true : router.createUrlTree(['/auth']);
}
