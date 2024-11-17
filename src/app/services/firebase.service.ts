import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userDatabase: CollectionReference
  tasksDatabase: CollectionReference

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.userDatabase = collection(this.firestore, 'users')
    this.tasksDatabase = collection(this.firestore, 'tasks')

  }


  async addUser(userdata: {}) {
    let user = await addDoc(this.userDatabase, userdata);
    return user.id
  }

}
