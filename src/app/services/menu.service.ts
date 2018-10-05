import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Vendor {
  name: string;
  rid: string;
  //description: string;
}

export interface Item {
  name: string;
  cost: string;
  description: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  // Collections to store temporary database items
  vendorsCollection: AngularFirestoreCollection<Vendor>;
  itemsCollection: AngularFirestoreCollection<Item>;

  constructor(
    private afS: AngularFirestore,
  ) { }

  // Grab the collection and return an observable
  getVendors() {
    this.vendorsCollection = this.afS.collection('restaurants', ref => {
      return ref.orderBy('name');
    });
    return this.vendorsCollection.valueChanges();
  }

  // Get the items with the specific rid and return an observable sorted by name
  getItems(rid) {
    this.itemsCollection = this.afS.collection(rid, ref => {
      return ref.orderBy('name');
    });
    return this.itemsCollection.valueChanges();
  }

}
