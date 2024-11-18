import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
signUpForm! : FormGroup

constructor(private userService: UserService, private cookieService: CookieService, private router: Router){
  this.signUpForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    marketing_accept: new FormControl('')
  })
}

onSignUpClick() {
  this.userService.SignUpUser(this.signUpForm.value).subscribe(
    (signUpResponse: { success: string; data: { token: string; }; }) => {
      console.log('login response', signUpResponse);
      if (signUpResponse.success) {
        this.cookieService.set('auth_token', signUpResponse?.data?.token);
        this.router.navigate(['/']);
      }
    },
    (error) => {
      console.log('error in login', error);
    }
  );
}
}
