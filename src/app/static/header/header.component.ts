import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private userService: UserService
  ) {}
  onLogoutClick() {
    this.userService.LogOutUser();
  }
}
