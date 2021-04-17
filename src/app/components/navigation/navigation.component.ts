import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  sharedLinks = [
    { title: 'DASHBOARD', path: '', icon: 'fas fa-home' },
    { title: 'MARKET', path: 'market', icon: 'fas fa-coins' },
  ];
  loginUser = [
    { title: 'MY ACCOUNT', path: '/my_account', icon: 'fas fa-key' },
    { title: 'LOGOUT', path: '/logout', icon: 'fas fa-key' },
  ];
  logoutUser = [
    { title: 'LOGIN', path: '/login', icon: 'fas fa-key' },
    { title: 'REGISTER', path: '/register', icon: 'fas fa-clipboard-list' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
