import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs, doc } from '@angular/fire/firestore';
import { deleteDoc, DocumentData, DocumentReference, query, updateDoc, where } from 'firebase/firestore';
import { Users } from '../interfaces/users';
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

  async getDocRef(collection: CollectionReference, id: string): Promise<DocumentReference<DocumentData>> {
    return doc(collection, id)
  }


  async addUser(userdata: {}) {
    let user = await addDoc(this.userDatabase, userdata);
    return user.id
  }


  async deleteContact(email: string): Promise<void> {
    const contactId = await this.getContactIdByEmail(email)
    try {
      const contactDocRef = doc(this.firestore, `contacts/${contactId}`);
      await deleteDoc(contactDocRef);
      console.log(`Contact with ID ${contactId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting contact: ', error);
    }
  }


  async getContactIdByEmail(email: string): Promise<string | null> {
    try {
      const contactQuery = query(this.contactsDatabase, where('email', '==', email));
      const querySnapshot = await getDocs(contactQuery);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.id;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async updateContact(contactId: string, updatedData: Partial<Users>) {
    try {
      const contactDocRef = doc(this.contactsDatabase, contactId);
      await updateDoc(contactDocRef, updatedData);
    } catch (error) {
    }
  }
}
