import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent {
  userId : string | null
  route = inject(ActivatedRoute)
  isAccountVerified = false
  userService = inject(UserService)
  isLoading = true;  // Add a loading state

constructor(){
  this.userId = this.route.snapshot.paramMap.get('userId');
  this.verifyUserById()
}

verifyUserById(){
  const userId = this.userId ?? '';
  this.userService.verifyUserAccountStatus(userId).subscribe((accountStatusResponse)=>{
    console.log("accountStatusResponse----------",accountStatusResponse)
    if(accountStatusResponse.data){
      this.isAccountVerified = true
    }
    this.isLoading = false;  // Set loading to false when the API call is complete

  },(error)=>{
    console.log("error in verifyUserById",error)
    this.isLoading = false;  // Set loading to false when the API call is complete
  })
}
}
