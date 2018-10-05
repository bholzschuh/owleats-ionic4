import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserRegister } from '../../models/userRegister';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  message: string;
  user = {} as UserRegister;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
  ) { }

  ngOnInit() {
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
