import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {EMPTY, mergeMap, Observable, of, take} from "rxjs";
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {user} from "@angular/fire/auth";
import {Profile} from "../domain/profile.model";

export const userResolver: ResolveFn<any>
= (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)=>
{
  const userService = inject(UserService);

  const users = userService.users;

  if (users.length === 0)
  {
    return userService.fetchUser();
  }
  else
  {
    return users;
  }

};
