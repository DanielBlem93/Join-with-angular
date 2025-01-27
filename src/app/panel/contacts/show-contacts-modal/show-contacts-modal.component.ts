import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { GetInitalsPipe } from '../../../pipes/get-initals.pipe';
import { FirebaseService } from '../../../services/firebase.service';
import { Users } from '../../../interfaces/users';
import { NgForm } from '@angular/forms';
import { HelpersService } from '../../../services/helpers.service';

@Component({
  selector: 'app-show-contacts-modal',
  standalone: true,
  imports: [CommonModule, GetInitalsPipe],
  templateUrl: './show-contacts-modal.component.html',
  styleUrl: './show-contacts-modal.component.scss'
})
export class ShowcontactsModalControlsComponent {

  @Input() contact!: Users
  randomColor!: string;
  color!: string



  showInfo: boolean = false


  sortedContacts: any[] = []; // Sortierte Kontakte mit Gruppierung

  isOpen: boolean = false
  currentMessage: string = 'Contact succesfuly created'




  @Input() myForm: any

  constructor(public fireService: FirebaseService,
    public helpers: HelpersService
  ) {

  }


  /**
   * Opens the EditContact Form
   */
  openEditContact() {
    this.helpers.contactsModalControls.editMode = true
    this.helpers.contactsModalControls.newContact = true
    this.setUserInput()
  }

  closeModal() {
    this.helpers.contactsModalControls.showContactInfo = false
  }


  /**
   * Fills inputs with the contact information
   * @param contact the contact object with the contactinformations
   */
  setUserInput() {
    this.helpers.resetContactsInput()
    let user = this.helpers.contactsModalControls.selectedUser
    this.helpers.contactsModalControls.inputs.username = user.username
    this.helpers.contactsModalControls.inputs.number = user.number
    this.helpers.contactsModalControls.inputs.email = user.email
  }




  changeIcon(event: MouseEvent, iconName: string): void {
    const target = event.currentTarget as HTMLElement;
    const imgElement = target.querySelector('img') as HTMLImageElement;
    if (imgElement) {
        imgElement.src = `./assets/img/${iconName}`;
    }
}

}
