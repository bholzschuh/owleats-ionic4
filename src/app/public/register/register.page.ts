import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserRegister } from '../../models/userRegister';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  message: string;
  user = {} as UserRegister;

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
  ) { }

  ngOnInit() {
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
