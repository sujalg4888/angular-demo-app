import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  isLoggedIn(): boolean | string {
    const token = this.cookieService.get('auth_token');
    if (token && !this.isTokenExpired(token)) {
      return token;
    } else {
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch (error) {
      console.log('error :', error);
      return true; // If there's an error decoding the token, treat it as expired
    }
  }

  obtainUserId(): string | null {
    const token = this.cookieService.get('auth_token');
    if (token) {
      // Decode the token's payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || null; // Assuming the user ID is stored as 'userId' in the payload
    }
    return null;
  }
}
