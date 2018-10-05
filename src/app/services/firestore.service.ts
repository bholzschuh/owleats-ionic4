import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  private users: Observable<User[]>;

  uid = "";

  constructor(
    private db: AngularFirestore,
    private authservice: AuthService,
  ) {
    this.uid = authservice.getUID();
  }

  /*
  getTable() {
    return this.users;
  }

  getUserInfo() {
    console.log('users/' + this.uid);
    this.userDoc = this.db.doc('users/' + this.uid);
    this.user = this.userDoc.valueChanges();
    return this.user;
  }*/
}
