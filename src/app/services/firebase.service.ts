import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  testDatabase
  userDatabase: CollectionReference 

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.testDatabase = collection(this.firestore, 'Test')
    this.userDatabase = collection(this.firestore, 'users')
  
  }


  async addUser(userdata: {} ) {
    let user = await addDoc(this.userDatabase, userdata);
    return user.id
  }

}
