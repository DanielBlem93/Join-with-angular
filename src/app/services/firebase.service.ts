import { inject, Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  testDatabase

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.testDatabase = collection(this.firestore, 'Test')
  
  }

}
