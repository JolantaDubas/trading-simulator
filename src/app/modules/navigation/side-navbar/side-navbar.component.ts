import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserGuard } from 'src/app/core/auth/user.guard';

interface Link {
  title: string;
  path: string;
  icon: string;
}
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  sharedLinks = [
    { title: 'DASHBOARD', path: '/', icon: 'fas fa-home' },
    { title: 'MARKET', path: '/market', icon: 'fas fa-coins' },
  ];
  loginUser = [
    {
      title: 'MY ACCOUNT',
      path: '/user/my-account',
      icon: 'fas fa-user-circle',
    },
    { title: 'LOGOUT', path: '/user/logout', icon: 'fas fa-power-off' },
  ];
  logoutUser = [
    { title: 'LOGIN/REGISTER', path: '/auth/login', icon: 'fas fa-key' },
    // {
    //   title: 'REGISTER',
    //   path: '/auth/register',
    //   icon: 'fas fa-clipboard-list',
    // },
  ];
  constructor(
    public router: Router,
    public userGuard: UserGuard,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  getLinks(): Link[] {
    if (this.authService.loggedIn()) {
      return [...this.sharedLinks, ...this.loginUser];
    } else return [...this.sharedLinks, ...this.logoutUser];
  }

  checkIfActive(linkPath): boolean {
    return this.router.url == linkPath;
  }
}
