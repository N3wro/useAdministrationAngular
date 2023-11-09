import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.auth.getAuthorizationToken();


    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });


    return next.handle(authReq);
  }
}
