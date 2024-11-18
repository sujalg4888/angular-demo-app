import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
})
export class MyAccountComponent implements OnInit {
  userId: string | null = null;
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  myAccountForm: FormGroup

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log('User ID:', this.userId);

    this.myAccountForm = new FormGroup({
      username : new FormControl(''),
      email : new FormControl('')
    })
  }

  ngOnInit(): void {
    // Extract the user ID from the route parameters
    this.fetchUserDataById(this.userId);
  }

  fetchUserDataById(userId: string | null) {
    this.userService.fetchUserById(userId).subscribe(
      (userResponse: {success: boolean, message: string, 
        data : {username: string, email: string}}) => {
        console.log(userResponse);
        this.myAccountForm.patchValue({
          username: userResponse.data.username,
          email: userResponse.data.email,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
