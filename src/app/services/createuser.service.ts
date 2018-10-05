import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface UserEntry {
  first: string;
  last: string;
  email: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateuserService {

  user = {} as UserEntry;

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
