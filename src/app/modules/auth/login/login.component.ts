import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { email, password, required } from 'src/app/core/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [email(), required()]],
      password: ['', [password(), required()]],
    });
  }

  onSubmit() {
    console.log('submit', this.form);
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
