import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tasks } from '../interfaces/tasks';
import { Task } from '../models/task.class';
import { Status } from '../interfaces/status';
import { Users } from '../interfaces/users';
import { User } from '../models/user.class';
import { NgForm } from '@angular/forms';
import { FirebaseService } from './firebase.service';
import { getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'any'
})
export class HelpersService {
  currentTask: Tasks = new Task();
  currentStatus: Status = 'todo';
  currentMessage: string = 'Contact succesfuly created'
  public isOpen: boolean = false

  public modalControls: {
    isModalClosed: boolean;
    modalToggleAnimation: boolean;
    addTaskMode: boolean;
    editTaskMode: boolean;
    showTaskMode: boolean;
  }

  public contactsModalControls: {
    selectedUser: Users
    showContactInfo: boolean;
    editMode: boolean,
    newContact: boolean,
    inputs: Users,
  }



  constructor(public router: Router, private fireService: FirebaseService) {


    this.modalControls = {
      isModalClosed: true,
      modalToggleAnimation: false,
      addTaskMode: false,
      editTaskMode: false,
      showTaskMode: false
    }

    this.contactsModalControls = {
      selectedUser: new User(),
      showContactInfo: false,
      editMode: false,
      newContact: false,
      inputs: {
        username: 'Max Mustermann',
        number: '0123456789',
        email: 'max@mustermann.de',
        color: '#258E7D'
      }
    }
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


  redirectTo(url: string, time: number) {
    setTimeout(() => {
      this.router.navigate([url])
    }, time);
  }

  doNotClose(event: Event) {
    this.modalControls.isModalClosed = false;
  }


  //=============Board ===============
  closeModal() {
    this.modalControls.isModalClosed = true;
    this.modalControls.modalToggleAnimation = false;
    this.currentStatus = 'todo';
    setTimeout(() => {
      this.modalControls.addTaskMode = false;
      this.modalControls.editTaskMode = false;
      this.modalControls.showTaskMode = false;
    }, 225);
  }

  toggleShowTask(task: Tasks) {
    this.currentTask = task;
    this.modalControls.isModalClosed = !this.modalControls.isModalClosed;
    this.modalControls.modalToggleAnimation = !this.modalControls.modalToggleAnimation
    this.modalControls.showTaskMode = !this.modalControls.showTaskMode
  }

  openAddTaskModal(status: Status) {
    this.modalControls.addTaskMode = true;
    this.modalControls.isModalClosed = !this.modalControls.isModalClosed;
    this.modalControls.modalToggleAnimation = !this.modalControls.modalToggleAnimation
    this.currentStatus = status
  }

  //=============Contacts===============


  /**
 * Clears all inputs
 */
  resetContactsInput() {
    this.contactsModalControls.inputs.username = ''
    this.contactsModalControls.inputs.number = ''
    this.contactsModalControls.inputs.email = ''
  }


  /**
   * Closes the "add-contact" modal by moving it off the visible screen area.
   */
  closecontactsModal(form: NgForm) {
    this.resetContactsInput()
    form.reset()
    this.contactsModalControls.editMode = false
    this.contactsModalControls.newContact = false
  }


  /**
 * Deletes the contact from Firebase
 */
  async deleteContact(myForm: NgForm) {
    try {
      await this.fireService.deleteContact(this.contactsModalControls.selectedUser.email)
      this.toggleMsg('User deleted')
      if (myForm) {
        this.closecontactsModal(myForm)
      }
    } catch (error) {
      this.toggleMsg('Somthing went wrong')
    }
    this.contactsModalControls.showContactInfo = false
  }


  /**
 * Set the values vor the Contactinformations
 * @param contact a userobject with contactinformation
 */
  setSelectedContact(contact: Users) {
    this.contactsModalControls.selectedUser.username = contact.username
    this.contactsModalControls.selectedUser.number = contact.number
    this.contactsModalControls.selectedUser.email = contact.email
    this.contactsModalControls.selectedUser.color = contact.color
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





}
