import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  passwordResetForm!: FormGroup;
  isEmailValid = false;
  isCodeVerified = false; // New property to track if the code is verified
  userService = inject(UserService);
  alertService = inject(AlertService);
  verificationCode: number | undefined;
  verificationCodeInput: number | undefined;
  constructor() {
    this.passwordResetForm = new FormGroup({
      email: new FormControl(''),
      verificationCodeInput: new FormControl(''),
      newPassword: new FormControl(''), // Added new password control
      confirmPassword: new FormControl(''),
    });
  }
  onEmailVerificationClick() {
    console.log('Password reset submitted');
    this.userService
      .verifyEmailForPasswordReset(this.passwordResetForm.value)
      .subscribe(
        (emailVerificationResponse: {
          success: string;
          data: { verificationCode: number };
        }) => {
          if (emailVerificationResponse.success) {
            this.verificationCode =
              emailVerificationResponse.data.verificationCode;
            console.log('this.verificationCode', this.verificationCode);
          }
        },
        (error) => {
          console.log('error in email verification', error);
        }
      );
  }

  onVerificationCodeSubmit() {
    if (
      this.passwordResetForm.get('verificationCodeInput')?.value ==
      this.verificationCode
    ) {
      this.isCodeVerified = true; // Set this to true to show the reset password form
      this.alertService.showSuccess(
        'Verification code matched. Proceed with password reset.'
      );
      // Add further logic to proceed with the password reset process
    } else {
      this.alertService.showError(
        'Verification code does not match. Please try again.'
      );
    }
  }

  onPasswordResetSubmit() {
    if (this.passwordResetForm.valid) {
      // Implement password reset logic here
      console.log("this.passwordResetForm.value----------", this.passwordResetForm.value);
      this.userService.resetUserPassword(this.passwordResetForm.value).subscribe((passwordResetResponse)=>{
        console.log('password reset response', passwordResetResponse);
        this.isEmailValid = false;
        this.isCodeVerified = false;
        this.passwordResetForm.reset(); // Reset the form after successful password reset
      })
      this.alertService.showSuccess('Password has been reset successfully!');
    }
  }
}
