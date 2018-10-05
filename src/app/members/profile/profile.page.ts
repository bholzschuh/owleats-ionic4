import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  uid = "";
  email = "";
  first = "";
  last = "";
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;

  constructor(
    private authservice: AuthService,
    private dbservice: FirestoreService,
    private afs: AngularFirestore,
  ) {
    this.uid = authservice.getUID();
    this.email = authservice.getEmail();
    this.userDoc = this.afs.doc('users/' + this.uid);
    this.userDoc.valueChanges().subscribe(res => {
      this.first = res.first;
      this.last = res.last;
    })
  }

  ngOnInit() { }

}
