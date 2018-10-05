import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDocument: AngularFirestoreDocument<User>;
  uid: string;

  constructor(
    private afS: AngularFirestore,
    private authservice: AuthService,
  ) { }

  getUserInfo() {
    this.uid = this.authservice.getUID();
    this.userDocument = this.afS.doc('users/' + this.uid);
    return this.userDocument.valueChanges();
  }

}
