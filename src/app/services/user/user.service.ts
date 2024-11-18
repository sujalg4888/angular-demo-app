import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../environments/environment.dev';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private ApiUrl = environment.API_URL
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  alertService = inject(AlertService);

  LoginInUser(formData: {
    email: string;
    password: string;
  }): Observable<{ success: string; data: { token: string } }> {
    return this.http.post<{ success: string; data: { token: string } }>(
      `${this.ApiUrl}/login`,
      formData
    );
  }

  SignUpUser(formData: {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    marketing_accept: boolean;
  }): Observable<{ success: string; data: { token: string } }> {
    return this.http.post<{ success: string; data: { token: string } }>(
      `${this.ApiUrl}/signup`,
      formData
    );
  }

  LogOutUser() {
    this.cookieService.delete('auth_token');
    const isUserLoggedOut = this.cookieService.get('auth_token');
    if (!isUserLoggedOut) {
      this.alertService.showSuccess('Logout Success');
      this.router.navigate(['/login']);
    }
  }

  fetchUserById(
    userId: string | null
  ): Observable<{
    success: boolean;
    message: string;
    data: { username: string; email: string };
  }> {
    return this.http.get<{
      success: boolean;
      message: string;
      data: { username: string; email: string };
    }>(`${this.ApiUrl}/user/${userId}`);
  }

  verifyEmailForPasswordReset(
    email: string
  ): Observable<{ success: string; data: { verificationCode: number } }> {
    return this.http.post<{
      success: string;
      data: { verificationCode: number };
    }>(`${this.ApiUrl}/verifyEmailForPasswordReset`, email);
  }

  resetUserPassword(formData: {newPassword: string, userEmail: string}){
    return this.http.post(`${this.ApiUrl}/resetUserPassword`, formData);
  }

  verifyUserAccountStatus(userId: string){
    return this.http.get<{success: boolean, message: string, data: {accountStatus: string}}>(`${this.ApiUrl}/verifyUserAccountStatus/${userId}`);

  }
}
