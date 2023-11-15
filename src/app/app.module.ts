import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationComponent } from './authentication/authentication.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./routing/routing.module";
import { HomePageComponent } from './home-page/home-page.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { OrderByEmailPipe } from './custom-pipes/order-by-email.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,
    FooterComponent,
    AuthenticationComponent,
    HomePageComponent,
    AdminHomePageComponent,
    OrderByEmailPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,

  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
