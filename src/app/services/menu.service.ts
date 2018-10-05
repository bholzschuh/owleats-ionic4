import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item';
import { Vendor } from '../models/vendor';


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
    this.itemsCollection = this.afS.collection('restaurants/' + rid + '/menu', ref => {
      return ref.orderBy('name');
    });
    return this.itemsCollection.valueChanges();
  }

}
