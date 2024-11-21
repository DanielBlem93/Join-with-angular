import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userDatabase: CollectionReference
  tasksDatabase: CollectionReference
  contactsDatabase: CollectionReference

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.userDatabase = collection(this.firestore, 'users')
    this.tasksDatabase = collection(this.firestore, 'tasks')
    this.contactsDatabase = collection(this.firestore, 'contacts')

  }

  async getTasks() {
    const querySnapshot = await getDocs(this.tasksDatabase);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }


  async addUser(userdata: {}) {
    let user = await addDoc(this.userDatabase, userdata);
    return user.id
  }

}
