import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  user = {} as User;

  constructor(
    private afS: AngularFirestore,
  ) { }

  addUser(value, uid) {
    this.user.first = value.first;
    this.user.last = value.last;
    this.user.email = value.email;
    this.user.uid = uid;
    this.afS.collection("users").doc(uid).set(this.user);
  }
}
