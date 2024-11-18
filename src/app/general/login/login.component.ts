import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm! : FormGroup
  hide = signal(true);
  alertService = inject(AlertService)

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router){
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

  onLoginClick(){
    this.userService.LoginInUser(this.loginForm.value).subscribe((loginResponse: { success: string; data: { token: string; }; })=>{
      if(loginResponse.success){
        this.cookieService.set('auth_token', loginResponse?.data?.token);
        this.alertService.showSuccess('Login Success')
        this.router.navigate(['/'])
      }
    },(error)=>{
      console.log("error in login",error)
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    // if (this.loginForm.email.hasError('required')) {
    //   this.errorMessage.set('You must enter a value');
    // } else if (this.email.hasError('email')) {
    //   this.errorMessage.set('Not a valid email');
    // } else {
    //   this.errorMessage.set('');
    // }
  }
}
