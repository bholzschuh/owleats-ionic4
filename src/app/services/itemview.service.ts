import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemviewService {

  itemDocument: AngularFirestoreDocument<Item>;

  constructor(
    private afS: AngularFirestore,
  ) { }

  getItemInfo(rid, iid) {
    this.itemDocument = this.afS.doc('restaurants/' + rid + '/menu/' + iid);
    return this.itemDocument.valueChanges();
  }

}
