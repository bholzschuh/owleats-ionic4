import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { CreateuserService } from './createuser.service';

//import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private plt: Platform,
    private userservice: CreateuserService,
  ) {
    // Check for login token if none check for firebase session
    this.plt.ready().then(() => {
      this.checkToken();
    })
  }

  // Starts the firebase session and on failure returns a message
  async login(value) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password);
      if (result) {
        this.storage.set(TOKEN_KEY, result.user.uid).then(res => {
          this.authenticationState.next(true);
        });
      }
    } catch (e) {
      return this.checkErrors(e.code)
    }
  }

  // Removes authtoken and ends firebase session
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
    this.afAuth.auth.signOut();
  }

  // Returns boolean based on authentication
  isAuthenticated() {
    return this.authenticationState.value;
  }

  // Checks if authtoken exists and then checks if firebase session exists
  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
      this.checkFireAuth();
    })
  }

  // Check if firebase session exists and manages authtoken accordingly
  checkFireAuth() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.storage.set(TOKEN_KEY, user.uid)
        this.authenticationState.next(true);
      }
      else {
        this.storage.remove(TOKEN_KEY).then(() => {
          this.authenticationState.next(false);
        })
      }
    })
  }

  // Checks errors of login
  checkErrors(error: String) {
    if (error == "auth/invalid-email") {
      return "Invalid Email Address";
    }
    else if (error == "auth/user-not-found" || error == "auth/wrong-password") {
      return "Incorrect Email/Password";
    }
    else if (error == "auth/argument-error") {
      return "Please fill out both fields";
    }
    else if (error == "auth/email-already-in-use") {
      return "That email is already in use";
    }
  }

  getUID() {
    return this.afAuth.auth.currentUser.uid;
  }
  getEmail() {
    return this.afAuth.auth.currentUser.email;
  }


  async registerEmailPass(value) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
      if (result) {
        this.storage.set(TOKEN_KEY, result.user.uid).then(res => {
          this.authenticationState.next(true);
        });
        this.userservice.addUser(value, this.getUID());
      }
    } catch (e) {
      console.error(e);
      return this.checkErrors(e.code);
    }
  }

}
