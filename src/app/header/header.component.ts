import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() appName: string = '';

  constructor(private router: Router, public authService: AuthService) {}

  navigateToHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['home']);
    });
  }
}
