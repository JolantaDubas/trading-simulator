import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGuard } from 'src/app/core/guards/user.guard';

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
    { title: 'DASHBOARD', path: '', icon: 'fas fa-home' },
    { title: 'MARKET', path: '/market', icon: 'fas fa-coins' },
  ];
  loginUser = [
    { title: 'MY ACCOUNT', path: '/user/my-account', icon: 'fas fa-key' },
    { title: 'LOGOUT', path: '/logout', icon: 'fas fa-key' },
  ];
  logoutUser = [
    { title: 'LOGIN/REGISTER', path: '/auth/login', icon: 'fas fa-key' },
    // {
    //   title: 'REGISTER',
    //   path: '/auth/register',
    //   icon: 'fas fa-clipboard-list',
    // },
  ];
  constructor(public router: Router, public userGuard: UserGuard) {}

  ngOnInit(): void {}

  getLinks(): Link[] {
    const token = localStorage.getItem('Token');

    if (!token) {
      return [...this.sharedLinks, ...this.logoutUser];
    } else return [...this.sharedLinks, ...this.loginUser];
  }

  checkIfActive(linkPath): boolean {
    return this.router.url == linkPath;
  }
}
