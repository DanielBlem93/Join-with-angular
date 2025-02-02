import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../../../services/helpers.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Users } from '../../../interfaces/users';
import { addDoc, getDocs } from 'firebase/firestore';
import { FirebaseService } from '../../../services/firebase.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { contactModalAnimation, modalAnimation } from '../../../animations/modal.animation';

@Component({
  selector: 'app-add-contacts-modal',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './add-contacts-modal.component.html',
  styleUrl: './add-contacts-modal.component.scss',
  animations: [contactModalAnimation, modalAnimation]
})
export class AddcontactsModalControlsComponent implements OnInit {
  randomColor!: string;
  color!: string

  constructor(public helpers: HelpersService,
    private fireService: FirebaseService,
    public authService: AuthenticationService) {

  }
  ngOnInit(): void {
    this.helpers.resetContactsInput()
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
    if (await this.helpers.checkEmail(data.email)) {
      try {
        this.addContactToDB(data, myForm)
      } catch (error) {
        this.helpers.toggleMsg(`${error}`)
      }
    } else {
      this.helpers.toggleMsg('Email allready exist')
    }
  }


  /**
 * Set User Objekt
 * @returns Userobjekt with data from inputs
 */
  setContact() {
    return {
      username: this.helpers.contactsModalControls.inputs.username,
      email: this.helpers.contactsModalControls.inputs.email,
      number: this.helpers.contactsModalControls.inputs.number,
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
   * creates a doc in FIrebase with contact data
   * @param data the data from the contact
   */
  async addContactToDB(data: Users, form: NgForm) {
    try {
      const docRef = await addDoc(this.fireService.contactsDatabase, data);
      this.helpers.closecontactsModal(form)
      this.helpers.toggleMsg('User successfully created')
    } catch (error) {
      this.helpers.toggleMsg('Somthing went wrong')
    }
  }



  async editContact(myForm: NgForm) {
    if (!await this.helpers.checkEmail(this.helpers.contactsModalControls.selectedUser.email)) {
      let id = await this.fireService.getContactIdByEmail(this.helpers.contactsModalControls.selectedUser.email)
      const updatedData = this.setContact()
      this.helpers.setSelectedContact(updatedData)
      this.fireService.updateContact(id!, updatedData)
      this.helpers.toggleMsg('User Updated')
    } else {
      this.helpers.toggleMsg('Something went wrong')
    }
    this.helpers.closecontactsModal(myForm)
  }




}
