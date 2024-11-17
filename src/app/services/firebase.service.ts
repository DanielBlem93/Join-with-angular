import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../models/user.class';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  testDatabase


  firestore: Firestore = inject(Firestore);

  constructor() {
    this.testDatabase = collection(this.firestore, 'Test')
  
  }


  async addUser(userdata: {}) {
    let user = await addDoc(collection(this.firestore, 'users'), userdata);
    return user.id
  }

}
