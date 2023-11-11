import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationComponent } from './authentication/authentication.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./routing.module";
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
    AuthenticationComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
