import {BrowserModule} from '@angular/platform-browser';
import {inject, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from '../app.component';
import {CanMatchFn, Route, RouterModule, Routes, UrlSegment} from "@angular/router";
import {ErrorPageComponent} from "../error-page/error-page.component";
import {HomePageComponent} from "../home-page/home-page.component";
import {AuthenticationComponent} from "../authentication/authentication.component";

import {userResolver} from "../resolver/user-resolver";
import {authGuard} from "./auth.guard";
import {adminAuthGuard} from "./adminAuth.guard";
import {AdminHomePageComponent} from "../admin-home-page/admin-home-page.component";


const appRoutes: Routes = [
  {
    path: '', redirectTo: "/auth", pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthenticationComponent

  },
  {
    path: 'dashboard',
    canActivate: [adminAuthGuard],
    component: AdminHomePageComponent,
    resolve: {userData: userResolver},

  },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomePageComponent,
  },

  {
    path: 'error', component: ErrorPageComponent,

  },
  {
    path: '**', redirectTo: '/error'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule {
}
