import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { email, password, required } from 'src/app/core/validators';
import { Request } from '../../../core/models/request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [email(), required()]],
      password: ['', [password(), required()]],
    });
  }

  onSubmit() {
    console.log('submit', this.form);
    this.authService
      .login(this.form.value)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('register', error);

          if (error.error.status === 401) {
            this.snackBar.showWarning(error.error.message, 'info');
          } else this.snackBar.showError(error.error.message, 'error');
          return throwError(error);
        })
      )
      .subscribe((res: Request) => {
        console.log(res);
        localStorage.setItem('Token', res.token);
        this.snackBar.showSuccess(res.message, 'success');
        this.router.navigate(['user/my-account']);
      });
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
