import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../models/user';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;
  message: string;
  user = {} as User;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
  ) {
    this.createForm();
  }

  register(value) {
    this.authservice.registerEmailPass(value)
      .then(res => {
        this.message = res;
      });
  }

  createForm() {
    this.registerForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
      ])],
    });
  }

}
