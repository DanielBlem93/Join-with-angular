import { Component } from '@angular/core';
import { HelpersService } from '../../../services/helpers.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../../../interfaces/users';
import { addDoc, getDocs } from 'firebase/firestore';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-add-contacts-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-contacts-modal.component.html',
  styleUrl: './add-contacts-modal.component.scss'
})
export class AddContactsModalComponent {
  randomColor!: string;
  color!: string

  constructor(public helpers: HelpersService,
    private fireService: FirebaseService,
    public authService: AuthenticationService) {

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
      this.helpers.toggleMsg('Email allready exist')
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
   * creates a doc in FIrebase with contact data
   * @param data the data from the contact
   */
  async sendContact(data: Users, form: NgForm) {
    try {
      const docRef = await addDoc(this.fireService.contactsDatabase, data);
      console.log('Dokument erfolgreich hinzugefügt mit ID:', docRef.id);
      this.closeModal(form)
      this.helpers.toggleMsg('User successfully created')
    } catch (error) {
      this.helpers.toggleMsg('Somthing went wrong')
    }
  }


  /**
* Closes the "add-contact" modal by moving it off the visible screen area.
*/
  closeModal(form: NgForm) {
    this.resetInput()
    form.reset()
    this.helpers.contactsModal.editMode = false
    const modal = document.getElementById('add-contakt-modal');
    if (modal) {
      modal.style.right = '-200%';
    }
  }



  /**
   * Set User Objekt
   * @returns Userobjekt with data from inputs
   */
  setContact() {
    return {
      username: this.helpers.contactsModal.inputs.username,
      email: this.helpers.contactsModal.inputs.email,
      number: this.helpers.contactsModal.inputs.number,
      color: this.getRandomColor()
    }
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
   * Fills inputs with the contact information
   * @param contact the contact object with the contactinformations
   */
  setUserInput(contact: Users) {
    this.resetInput()
    this.helpers.contactsModal.inputs.username = contact.username
    this.helpers.contactsModal.inputs.number = contact.number
    this.helpers.contactsModal.inputs.email = contact.email
  }

  /**
   * Clears all inputs
   */
  resetInput() {
    this.helpers.contactsModal.inputs.username = ''
    this.helpers.contactsModal.inputs.number = ''
    this.helpers.contactsModal.inputs.email = ''
  }



}
