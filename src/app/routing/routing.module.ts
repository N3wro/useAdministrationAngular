import {BrowserModule} from '@angular/platform-browser';
import {inject, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {AppComponent} from '../app.component';
import {CanMatchFn, Route, RouterModule, Routes, UrlSegment} from "@angular/router";
import {ErrorPageComponent} from "../error-page/error-page.component";
import {HomePageComponent} from "../home-page/home-page.component";
import {AuthenticationComponent} from "../authentication/authentication.component";

import {userResolver} from "../resolver/user-resolver";



const appRoutes: Routes = [
  {path: '',
    component: AuthenticationComponent},
  {
    path: 'home',
    component: HomePageComponent,
    resolve: {userData: userResolver},

  },

  // {
  //   path: 'servers', canActivate: [AuthGuardService], component: ServersComponent, children: [
  //     {path: ':id', component: ServerComponent},
  //     {path: ':id/edit', component: EditServerComponent}
  //   ]
  //
  // },
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
