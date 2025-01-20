import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GetInitalsPipe } from '../../../pipes/get-initals.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { Users } from '../../../interfaces/users';
import { NgForm } from '@angular/forms';
import { HelpersService } from '../../../services/helpers.service';

@Component({
  selector: 'app-contacts-modal',
  standalone: true,
  imports: [CommonModule, GetInitalsPipe],
  templateUrl: './show-contacts-modal.component.html',
  styleUrl: './show-contacts-modal.component.scss'
})
export class ContactsModalComponent {

  inputName: any;
  inputMail: any;
  inputNumber: any;
  randomColor!: string;
  color!: string

  editMode: boolean = false
  showInfo: boolean = false


  sortedContacts: any[] = []; // Sortierte Kontakte mit Gruppierung

  isOpen: boolean = false
  currentMessage: string = 'Contact succesfuly created'



  @Input() selectedUser: any;
  @Input() myForm: any

  constructor(public fireService: FirebaseService,
    public helpers: HelpersService
  ) {

  }


  /**
   * Opens the EditContact Form
   */
  openEditContact() {
    this.editMode = true
    this.openModal()
  }



  /**
   * Opens the "modal" modal by adjusting its position on the screen.
   * Prior to opening, it resets the modal to its initial state.
   */
  openModal() {
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
   * Clears all inputs
   */
  resetInput() {
    this.inputName = ''
    this.inputNumber = ''
    this.inputMail = ''
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
   * Deletes the contact from Firebase
   */
  deleteContact(myForm: NgForm) {
    try {
      this.fireService.deleteContact(this.selectedUser.email)
      this.closeModal(myForm)
      this.helpers.toggleMsg('User deleted')
    } catch (error) {
      this.helpers.toggleMsg('Somthing went wrong')
    }
    this.helpers.contactsModal.showContactInfo = false
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


}
