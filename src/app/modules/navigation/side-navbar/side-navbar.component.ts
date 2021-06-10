import { Component, OnInit } from '@angular/core';

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
    { title: 'MY ACCOUNT', path: '/my_account', icon: 'fas fa-key' },
    { title: 'LOGOUT', path: '/logout', icon: 'fas fa-key' },
  ];
  logoutUser = [
    { title: 'LOGIN', path: '/auth/login', icon: 'fas fa-key' },
    {
      title: 'REGISTER',
      path: '/auth/register',
      icon: 'fas fa-clipboard-list',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
