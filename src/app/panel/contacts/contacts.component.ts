import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { addDoc, collectionData, getDocs } from '@angular/fire/firestore';
import { Users } from '../../interfaces/users';
import { HelpersService } from '../../services/helpers.service';
import { msgBoxAnimation } from '../../animations/msgBox.animations';
import { MsgBoxComponent } from '../../msg-box/msg-box.component';
import { ResponsiveService } from '../../services/responsive.service';
import { ContactsModalComponent } from "./show-contacts-modal/show-contacts-modal.component";
import { contactModalAnimation } from '../../animations/modal.animation';
import { AddContactsModalComponent } from "./add-contacts-modal/add-contacts-modal.component";


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, MsgBoxComponent, ContactsModalComponent, AddContactsModalComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],

  animations: [msgBoxAnimation, contactModalAnimation]
})


export class ContactsComponent implements OnInit {





  contacts$: Observable<any[]>; // Stream für die Kontakte
  private contactsSubscription: Subscription | undefined;

  sortedContacts: any[] = []; // Sortierte Kontakte mit Gruppierung
  selectedUser: Users

  isOpen: boolean = false
  currentMessage: string = 'Contact succesfuly created'



  constructor(
    private fireService: FirebaseService,
    public authService: AuthenticationService,
    public helpers: HelpersService,
    public responsiveService: ResponsiveService
  ) {

    this.contacts$ = collectionData(this.fireService.contactsDatabase, { idField: 'id' });
    this.selectedUser = {
      username: 'Max Mustermann',
      email: 'max@muster.de',
      number: '0123456789',
      color: '#258E7D'
    }
  }

  ngOnInit() {
    this.sortContacts();
  }

  ngOnDestroy() {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }

  /**
   * sort Contacts by username A-Z
   */
  sortContacts() {
    this.contactsSubscription = this.contacts$.subscribe(contacts => {
      const filteredContacts = contacts.filter(contact => contact.username);
      const sortedContacts = filteredContacts.sort((a, b) =>
        a.username.localeCompare(b.username, undefined, { sensitivity: 'base' })
      );
      this.sortedContacts = this.groupContactsByInitials(sortedContacts);
    });
  }

  /**
   * Groups the contacts by their inital letter
   * @param contacts array with contacts
   * @returns a sorted array with usernames and their intitals
   */
  groupContactsByInitials(contacts: any[]) {
    let lastInitial = '';
    return contacts.map(contact => {
      const [firstInitial, secondInitial] = this.getInitials(contact.username);
      const showInitial = firstInitial.toUpperCase() !== lastInitial;
      lastInitial = firstInitial.toUpperCase();

      return {
        ...contact,
        firstInitial,
        secondInitial,
        showInitial
      };
    });
  }


  /**
   * @param username the username you want the Initals from
   * @returns The first and second inital
   */
  getInitials(username: string): string[] {
    const parts = username.split(' ');
    const firstInitial = parts[0]?.[0] || '';
    const secondInitial = parts[1]?.[0] || '';
    return [firstInitial, secondInitial];
  }


  /**
   * Removes the "," from the Initals
   * @param initals The Initals from the username
   * @returns a clean string without "," : 'DB'
   */
  removeCharacter(initals: string[]) {
    const first = initals[0]
    const second = initals[1]
    const string = `${first}${second}`
    return string
  }


  /**
   * Check If email exist
   * @param email string you want to check
   * @returns boolean if email is in the contacts database
   */
  async checkEmail(email: string) {
    const usermail = await this.getUserEmail(email)
    if (usermail)
      return false
    else
      return true
  }

  /**
* Checks if the email is exitend in the Contacts Database
* @param email email you want to check
* @returns null or the email you want to check
*/
  async getUserEmail(email: string) {
    const querySnapshot = await getDocs(this.fireService.contactsDatabase);
    let userMail: string | null = null;
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const mail = data['email']

      if (mail === email) {
        userMail = mail
      }
    });
    return userMail
  }




  /**
   * Opens the "modal" modal by adjusting its position on the screen.
   * Prior to opening, it resets the modal to its initial state.
   */
  openAddContactModal() {

    this.helpers.contactsModal.newContact = true
    this.helpers.contactsModal.editMode = false

  }





  /**
   * Displays the contact information of the selected contact
   * @param contact a userobject with contactinformation
   */
  showContactInfo(contact: Users): void {
    this.helpers.contactsModal.showContactInfo = true
    this.setSelectedUser(contact)
  }


  /**
   * Set the values vor the Contactinformations
   * @param contact a userobject with contactinformation
   */
  setSelectedUser(contact: Users) {
    this.selectedUser.username = contact.username
    this.selectedUser.number = contact.number
    this.selectedUser.email = contact.email
    this.selectedUser.color = contact.color
  }








}
