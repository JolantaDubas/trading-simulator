import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackBar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, private snackBar: SnackBarService) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log('onsubmit');
    localStorage.removeItem('Token');
    this.snackBar.showSuccess('You have been logout successfully');
    this.router.navigate(['/']);
  }
}
