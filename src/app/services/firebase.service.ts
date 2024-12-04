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
      // Erstelle eine Referenz zu deiner contactsDatabase
      const contactsCollection = collection(this.firestore, 'contacts');

      // Führe eine Abfrage mit der E-Mail-Adresse durch
      const contactQuery = query(contactsCollection, where('email', '==', email));
      const querySnapshot = await getDocs(contactQuery);

      // Prüfe, ob Dokumente gefunden wurden und hole die ID
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Nimm das erste gefundene Dokument
        return doc.id; // Rückgabe der Dokument-ID
      } else {
        console.warn('No contact found with this email.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching contact by email: ', error);
      return null;
    }
  }

  async updateContact(contactId: string, updatedData: Partial<Users>) {
    try {
      // Referenz zum spezifischen Dokument in der Datenbank
      const contactDocRef = doc(this.contactsDatabase, contactId);
  
      // Aktualisierung der Felder
      await updateDoc(contactDocRef, updatedData);
      console.log('Contact successfully updated.');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }
}
