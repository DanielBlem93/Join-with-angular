import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { Users } from '../../interfaces/users';
import { HelpersService } from '../../services/helpers.service';
import { msgBoxAnimation } from '../../animations/msgBox.animations';
import { MsgBoxComponent } from '../../msg-box/msg-box.component';
import { ResponsiveService } from '../../services/responsive.service';
import { ShowcontactsModalControlsComponent } from "./show-contacts-modal/show-contacts-modal.component";
import { contactModalAnimation } from '../../animations/modal.animation';
import { AddcontactsModalControlsComponent } from "./add-contacts-modal/add-contacts-modal.component";
import { GetInitalsPipe } from '../../pipes/get-initals.pipe';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule, MsgBoxComponent, AddcontactsModalControlsComponent, ShowcontactsModalControlsComponent, GetInitalsPipe],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],

  animations: [msgBoxAnimation, contactModalAnimation]
})


export class ContactsComponent implements OnInit {


  contacts$: Observable<any[]>; // Stream für die Kontakte
  private contactsSubscription: Subscription | undefined;

  sortedContacts: any[] = []; // Sortierte Kontakte mit Gruppierung

  isOpen: boolean = false
  currentMessage: string = 'Contact succesfuly created'

  constructor(
    private fireService: FirebaseService,
    public authService: AuthenticationService,
    public helpers: HelpersService,
    public responsiveService: ResponsiveService
  ) {

    this.contacts$ = collectionData(this.fireService.contactsDatabase, { idField: 'id' });
    this.helpers.contactsModalControls.selectedUser = {
      username: 'Max Mustermann',
      email: 'max@muster.de',
      number: '0123456789',
      color: '#258E7D'
    }
  }

  ngOnInit() {
    this.sortContacts();
    this.helpers.contactsModalControls.showContactInfo = false
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
   * Opens the "modal" modal by adjusting its position on the screen.
   * Prior to opening, it resets the modal to its initial state.
   */
  openAddContactModal() {

    this.helpers.contactsModalControls.newContact = true
    this.helpers.contactsModalControls.editMode = false

  }


  /**
   * Displays the contact information of the selected contact
   * @param contact a userobject with contactinformation
   */
  showContactInfo(contact: Users): void {
    this.helpers.contactsModalControls.showContactInfo = true
    this.helpers.setSelectedContact(contact)
    console.log('selected contact is:', contact)
  }










}
