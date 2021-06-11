import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { email, password, required } from 'src/app/core/validators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Request } from '../../../core/models/request';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // email: ['', [email('shared.form.validation.email'), required('shared.form.validation.email-required')]],
      // password: ['', required('shared.form.validation.password-required')],
      name: ['', required()],
      email: ['', [email(), required()]],
      password: ['', [password(), required()]],
    });
  }

  onSubmit() {
    console.log('submit', this.form);
    this.authService
      .register(this.form.value)
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
        console.log('register', res);

        this.snackBar.showSuccess(res.message, 'success');
        // this.snackBar.showInfo(res.message, 'info');
        // this.snackBar.showError(res.message, 'error');
        // this.snackBar.showWarning(res.message, 'warning');
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
