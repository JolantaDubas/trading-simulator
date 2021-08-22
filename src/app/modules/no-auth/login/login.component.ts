import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { UserService } from 'src/app/core/services/user.service';
import { AppState } from 'src/app/core/store/app.state';
import { email, password, required } from 'src/app/core/validators';
import { ResponseModel } from '../../../core/models/responseModel';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../core/store/user/user.actions';
import * as TradesActions from '../../../core/store/trades/trades.actions';
import { TradeService } from 'src/app/core/services/trade.service';

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
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private tradeService: TradeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [email(), required()]],
      password: ['', [password(), required()]],
    });
  }

  onSubmit() {
    if (this.form.valid)
      this.authService
        .login(this.form.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.error.status === 401) {
              this.snackBar.showWarning(error.error.message);
            } else this.snackBar.showError(error.error.message);
            return throwError(error);
          })
        )
        .subscribe((res: ResponseModel) => {
          localStorage.setItem('Token', res.token);
          this.getProfile();
          this.snackBar.showSuccess(res.message);
          this.router.navigate(['user/my-account']);
        });
  }
  getProfile() {
    this.userService.getProfile().subscribe((res: ResponseModel) => {
      this.store.dispatch(new UserActions.SetUser(res.data));
    });

    this.tradeService.getTrades().subscribe((res: ResponseModel) => {
      this.store.dispatch(new TradesActions.SetTrades(res.data));
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
