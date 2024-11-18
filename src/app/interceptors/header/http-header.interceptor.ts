import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const HttpHeaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const auth = inject(AuthService);

  // Get the auth token from the service.
  const authToken = auth.isLoggedIn();

  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  const authReq = req.clone({
    headers: req.headers.set('Authorization', authToken.toString()),
  });

  // send cloned request with header to the next handler.
  return next(authReq);
};
