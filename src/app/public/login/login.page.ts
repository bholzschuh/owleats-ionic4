import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;
  message: string;
  user = {} as User;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
  ) {
    this.createForm();
  }

  login(value) {
    this.authservice.login(value)
      .then(res => {
        this.message = res;
      });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  checkAuth() {
    console.log(this.authservice.isAuthenticated());
  }


}
