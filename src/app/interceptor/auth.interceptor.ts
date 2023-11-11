import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";
import {exhaustMap, take} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        alert(modifiedReq)
        return next.handle(modifiedReq);
      }));
  }
}
