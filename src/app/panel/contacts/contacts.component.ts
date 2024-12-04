import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, Renderer2, ElementRef, ViewChildren, QueryList, AfterContentChecked } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { first, Observable } from 'rxjs';
import { addDoc, collectionData, getDocs, Index } from '@angular/fire/firestore';
import { Users } from '../../interfaces/users';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],

  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        left: '50%',
        opacity: 1,
        top: '80%',

      })),
      state('closed', style({
        top: '80%',
        left: '200%',

        opacity: 0.0,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})


export class ContactsComponent implements OnInit {
  inputName: any;
  inputMail: any;
  inputNumber: any;
  randomColor!: string; // Variable für die zufällige Farbe
  public isOpen: boolean;
  contacts$: Observable<any[]>; // Stream für die Kontakte
  sortedContacts: any[] = []; // Sortierte Kontakte mit Gruppierung
  selectedUser: Users
  color!: string
  editMode: boolean = false
  currentMessage: string = 'Contact succesfuly created'




  constructor(
    private fireService: FirebaseService,
    public authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {

    this.isOpen = false
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


  /**
   * sort Contacts by username A-Z
   */
  sortContacts() {
    this.contacts$.subscribe(contacts => {
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
   * A method to get random colors
   * @returns a #color code as string
   */
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  /**
   * Handels whats happen if the form is submitted
   * @param myForm the NgForm form the HTML
   */
  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      this.createContact(myForm);
    }
  }


  /**
   * creates a contact in firebase
   */
  async createContact(myForm: NgForm) {
    const data: Users = this.setContact()
    if (await this.checkEmail(data.email)) {
      try {
        this.sendContact(data, myForm)
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Dokuments:', error);
      }
    } else {
      alert('Email allready exist')
    }
  }


  /**
   * Set User Objekt
   * @returns Userobjekt with data from inputs
   */
  setContact() {
    return {
      username: this.inputName,
      email: this.inputMail,
      number: this.inputNumber,
      color: this.getRandomColor()
    }
  }


  /**
   * creates a doc in FIrebase with contact data
   * @param data the data from the contact
   */
  async sendContact(data: Users, form: NgForm) {
    try {
      const docRef = await addDoc(this.fireService.contactsDatabase, data);
      console.log('Dokument erfolgreich hinzugefügt mit ID:', docRef.id);
      this.closeModal(form)
      this.toggleMsg('User successfully created')
    } catch (error) {
      this.toggleMsg('Somthing went wrong')
    }
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
   * open/close the messagebox
   */
  toggleMsg(message: string) {
    this.currentMessage = message
    setTimeout(() => {
      this.isOpen = !this.isOpen
    }, 500);
    setTimeout(() => {
      this.isOpen = !this.isOpen
    }, 2500);
  }


  /**
   * Opens the "add-contact" modal by adjusting its position on the screen.
   * Prior to opening, it resets the modal to its initial state.
   */
  openModalAddContakt() {
    this.resetInput()
    const modal = document.getElementById('add-contakt-modal') as HTMLElement | null;

    if (modal && !this.editMode) {
      modal.style.right = '0';

    } else if (modal && this.editMode) {
      modal.style.right = '0';
      this.setUserInput(this.selectedUser)
    }
  }


  /**
  * Closes the "add-contact" modal by moving it off the visible screen area.
  */
  closeModal(form: NgForm) {
    this.resetInput()
    form.reset()
    this.editMode = false
    const modal = document.getElementById('add-contakt-modal');
    if (modal) {
      modal.style.right = '-200%';
    }
  }


  /**
   * Displays the contact information of the selected contact
   * @param job  'open' or 'close' for toggle
   * @param contact a userobject with contactinformation
   */
  toggleContactInfo(job: string, contact: Users): void {
    const contactContent = document.getElementById('contact-content');
    if (contactContent) {
      contactContent.style.right = job === 'open' ? '0' : '-200%';

      if (job === 'open') {
        this.setSelectedUser(contact)
      }
    }
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

  /**
   * Fills inputs with the contact information
   * @param contact the contact object with the contactinformations
   */
  setUserInput(contact: Users) {
    this.resetInput()
    this.inputName = contact.username
    this.inputNumber = contact.number
    this.inputMail = contact.email
  }

  /**
   * Clears all inputs
   */
  resetInput() {
    this.inputName = ''
    this.inputNumber = ''
    this.inputMail = ''
  }

  /**
   * Opens the EditContact Form
   */
  openEditContact() {
    this.editMode = true
    this.openModalAddContakt()
  }


  /**
   * Edit the contact with the new Contactinformations
   */
  async editContact(myForm: NgForm) {
    if (!await this.checkEmail(this.selectedUser.email)) {
      let id = await this.fireService.getContactIdByEmail(this.selectedUser.email)
      const updatedData = this.setContact()
      this.setSelectedUser(updatedData)
      this.fireService.updateContact(id!, updatedData)
      this.toggleMsg('User Updated')
    } else {
      this.toggleMsg('Something went wrong')
    }
    this.closeModal(myForm)
  }


  /**
   * Deletes the contact from Firebase
   */
  deleteContact(myForm: NgForm) {
    try {
      this.fireService.deleteContact(this.selectedUser.email)
      this.closeModal(myForm)
      this.toggleMsg('User deleted')
    } catch (error) {
      this.toggleMsg('Somthing went wrong')
    }
    this.toggleContactInfo('close', this.selectedUser)
  }





}
