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


export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService)
  let isAuthenticated: boolean;
  authService.user.pipe(
    take(1),
    map(user => {
      return !!user
    })
  ).subscribe(value =>
    isAuthenticated = value
  );




  return isAuthenticated ? true : router.createUrlTree(['/auth']);
}
