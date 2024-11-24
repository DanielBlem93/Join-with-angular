import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, Renderer2, ElementRef, ViewChildren, QueryList, AfterContentChecked } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { addDoc, collectionData } from '@angular/fire/firestore';
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


export class ContactsComponent implements OnInit, AfterContentChecked {
  inputName: any;
  inputMail: any;
  inputNumber: any;
  randomColor!: string; // Variable für die zufällige Farbe
  public isOpen: boolean;
  contacts$: Observable<any[]>; // Stream für die Kontakte
  sortedContacts: any[] = []; // Sortierte Kontakte mit Gruppierung

  @ViewChildren('contactIcon') contactIcon!: QueryList<ElementRef>;



  constructor(
    private fireService: FirebaseService,
    public authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {

    this.isOpen = false
    this.contacts$ = collectionData(this.fireService.contactsDatabase, { idField: 'id' });
  }

  ngOnInit() {
    this.sortContacts();
  }

  ngAfterContentChecked() {
    this.applyRandomColors()
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
   * Method to change the icon backgroundcolors
   */
 applyRandomColors() {

    if (this.contactIcon) {
      this.cdr.detectChanges();
      this.contactIcon.forEach(icon => {
        const randomColor = this.getRandomColor();
        this.renderer.setStyle(icon.nativeElement, 'background-color', randomColor);
      });
    }
  }


/**
 * A method to get random colors
 * @returns a # color code as string
 */
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      this.createContact();
    }
  }


/**
 * creates a contact in firebase
 */
  async createContact() {

    const data: Users = {
      username: this.inputName,
      email: this.inputMail,
      number: this.inputNumber
    }
    try {
      const docRef = await addDoc(this.fireService.contactsDatabase, data);
      console.log('Dokument erfolgreich hinzugefügt mit ID:', docRef.id);
      this.closeModal()
      this.toggleMsg()
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Dokuments:', error);
    }
  }

/**
 * open/close the messagebox
 */
  toggleMsg() {
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
    this.resetModal();
    const modal = document.getElementById('add-contakt-modal');
    if (modal) {
      modal.style.right = '0';
    }
  }


  /**
  * Closes the "add-contact" modal by moving it off the visible screen area.
  */
  closeModal() {
    this.resetModal();
    const modal = document.getElementById('add-contakt-modal');
    if (modal) {
      modal.style.right = '-200%';
    }
  }


  /**
* Resets the modal by clearing input fields and toggling visibility of buttons.
* Changes the header text to default values.
*/
  resetModal() {
    this.setValue('contactName', '');
    this.setValue('contactEmail', '');
    this.setValue('contactPhone', '');
    this.toggleClass('btn-add', 'displaynone', false);
    this.toggleClass('btn-edit', 'displaynone', true);
    this.setValue('header-add-edit', 'Add');
    this.setValue('header-text', 'Tasks are better with a team!');
  }


  /**
* Sets the value of an HTML element.
* @param {string} id - The ID of the HTML element.
* @param {string} value - The new value to be set.
*/
  setValue(id: string, value: string) {
    const element = document.getElementById(id) as HTMLInputElement | null;
    if (element) {
      element.value = value;
    } else {
      console.error(`Element with id ${id} not found`);
    }
  }


  /**
  * Toggles a class for an HTML element.
  * @param {string} id - The ID of the HTML element.
  * @param {string} className - The class to be toggled.
  * @param {boolean} shouldAdd - If true, adds the class, otherwise removes it.
  */
  toggleClass(id: string, className: string, shouldAdd: boolean) {
    const element = document.getElementById(id);
    if (element) {
      shouldAdd ? element.classList.add(className) : element.classList.remove(className);
    } else {
      console.error(`Element with id ${id} not found`);
    }
  }

  // async getUserEmail() {
  //   const currentUserEmail = this.authService.auth.currentUser?.email
  //   const querySnapshot = await getDocs(this.fireService.userDatabase);
  //   querySnapshot.forEach((doc) => {

  //     const data = doc.data()
  //     const userMail = data['email']

  //     if (userMail === currentUserEmail) {
  //       console.log(userMail);
  //       return userMail
  //     }
  //   });
  // }




  // /**
  // * Fetches input values for contact name, email, and phone from the DOM.
  // * @returns {Object} An object containing the name, email, and phone as properties.
  // */
  // getInputValues() {
  //   const nameInput = document.getElementById('contactName').value;
  //   const emailInput = document.getElementById('contactEmail').value;
  //   const phoneInput = document.getElementById('contactPhone').value;
  //   return { nameInput, emailInput, phoneInput };
  // }


  // /**
  // * Validates the input fields for a new contact.
  // * @param {string} name - The name of the contact.
  // * @param {string} email - The email of the contact.
  // * @param {string} phone - The phone number of the contact.
  // * @returns {boolean} True if all fields are valid, false otherwise.
  // */
  // validateInput(name, email, phone) {
  //   this.clearErrorMessages();
  //   if (!this.isValid('name', name)) {
  //     this.displayError(document.getElementById('contactName'), 'Please enter first and last name separated by a space.');
  //     return false;
  //   }
  //   if (!this.isValid('email', email)) {
  //     this.displayError(document.getElementById('contactEmail'), 'Please enter a valid email address.');
  //     return false;
  //   }
  //   if (!this.isValid('phone', phone)) {
  //     this.displayError(document.getElementById('contactPhone'), 'Please enter only numbers for the phone.');
  //     return false;
  //   }
  //   return true;
  // }

  // /**
  // * Creates a new contact object based on the input fields.
  // * @param {string} name - The name of the contact.
  // * @param {string} email - The email of the contact.
  // * @param {string} phone - The phone number of the contact.
  // * @returns {Object} An object representing the new contact.
  // */
  // createContactObject(name, email, phone) {
  //   const id = this.generateId();
  //   const colorIcon = this.getRandomColor();
  //   return {
  //     name: name,
  //     email: email,
  //     phone: phone,
  //     id: id,
  //     colorIcon: colorIcon
  //   };
  // }
  //   /**
  //   * Fetches contacts from Storage, sorts them, generates the corresponding HTML and inserts it into the contact list.
  //   * @async
  //   */
  //   async getContacts() {
  //     const contactList = document.getElementById('contacts-list');
  //     let contacts = JSON.parse(await getItem('contacts')) || [];
  //     contacts = contacts.filter(contact => contact.name);
  //     contacts.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))

  //     let lastInitial = '';
  //     let htmlString = contacts.reduce((acc, contact) => {
  //       const [firstInitial, secondInitial] = getInitials(contact.name);
  //       const color = getRandomColor();
  //       const initialBlock = firstInitial.toUpperCase() !== lastInitial
  //         ? `<div class="contact-list-first-latter">${firstInitial.toUpperCase()}</div><hr class="contact-list-hr">`
  //         : '';

  //       lastInitial = firstInitial.toUpperCase();
  //       contactsArray.push(contact);
  //       const contactIndex = contactsArray.length - 1;
  //       const contactBlock = renderContactBlock(contact, firstInitial, secondInitial, color, contactIndex);

  //       return acc + initialBlock + contactBlock;
  //     }, '');

  //     contactList.innerHTML = htmlString;
  //   }

  //   /**
  //   * Performs actions that are necessary after a contact has been successfully added.
  //   * @async
  //   * @returns {Promise<void>} Resolves once all the post-add actions are completed.
  //   */
  //   async postAddActions() {
  //     await  this.getContacts();
  //     this.closeModal();
  //   }


  //   /**
  //   * Main  to create a new contact based on input values.
  //   * @async
  //   * @returns {Promise<void>} Resolves once the contact has been added and all subsequent operations are completed.
  //   */
  //   async createContact() {
  //     const { nameInput, emailInput, phoneInput } =  this.getInputValues();

  //     if (!this.validateInput(nameInput, emailInput, phoneInput)) {
  //       return;
  //     }

  //     const contact =  this.createContactObject(nameInput, emailInput, phoneInput);

  //     await  this.addContact(contact);
  //     await  this.postAddActions();
  //   }


  //   /**
  //   * Generates a unique identifier by combining a random string and the current timestamp.
  //   * 
  //   * @returns {string} A unique string identifier.
  //   */
  //   generateId() {
  //     return Math.random().toString(36).substr(2) + Date.now().toString(36);
  //   }


  //   /**
  //   * Clears all elements with the class name "error-message" from the DOM.
  //   */
  //   clearErrorMessages() {
  //     document.querySelectorAll('.error-message').forEach(el => el.remove());
  //   }


  //   /**
  //   * Validates the provided input based on its type (name, email, or phone).
  //   * 
  //   * @param {string} type - The type of the input ("name", "email", or "phone").
  //   * @param {string} value - The value to be validated.
  //   * @returns {boolean} `true` if the value is valid, `false` otherwise.
  //   */
  //   isValid(type, value) {
  //     let regex;
  //     switch (type) {
  //       case 'name':
  //         regex = /^[a-z]+\s[a-z]+$/i;
  //         break;
  //       case 'email':
  //         regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //         break;
  //       case 'phone':
  //         regex = /^\d+$/;
  //         break;
  //       default:
  //         return false;
  //     }
  //     return regex.test(value);
  //   }


  //   /**
  //   * Displays an error message next to the specified input element.
  //   * 
  //   * @param {Element} inputElement - The DOM element (input field) where the error occurred.
  //   * @param {string} message - The error message to be displayed.
  //   */
  //   displayError(inputElement, message) {
  //     let errorMessage = document.createElement('div');
  //     errorMessage.className = 'error-message';
  //     errorMessage.style.color = 'red';
  //     errorMessage.textContent = message;
  //     inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
  //   }


  //   /**
  //   * Adds a new contact to the storage (presumably local storage).
  //   * Retrieves the current list of contacts, adds the new contact, and then updates the storage.
  //   * 
  //   * @param {Object} contact - The contact object to be added.
  //   * @requires getItem - A  that retrieves a stored item by its key.
  //   * @requires setItem - A  that stores an item by its key.
  //   */
  //   async addContact(contact) {
  //     let contacts = JSON.parse(await getItem('contacts')) || [];
  //     contacts.push(contact);
  //     await setItem('contacts', JSON.stringify(contacts));
  //   }






  //   /**
  //   * Renders an action button for a contact.
  //   * @param {string} contactString - The stringified contact object.
  //   * @param {string} action - The action for the button.
  //   * @return {string} The HTML string for the action button.
  //   */
  //   renderActionButton(contactString, action) {
  //     let imgPath = action === 'edit' ? './assets/img/edit.png' : './assets/img/delete.png';
  //     let actionFunction = action === 'edit' ? 'openModalEditContakt' : 'deleteContact';
  //     return /*html*/ `
  //       <div onclick="${actionFunction}(${contactString})" class="contact-body-header-${action}">
  //           <img src="${imgPath}" alt="">
  //           ${action.charAt(0).toUpperCase() + action.slice(1)}
  //       </div>
  //   `;
  //   }


  //   /**
  //   * Shows the selected contact in a right panel.
  //   * @param {number} index - The index of the contact in the contacts array.
  //   */
  //   applyStyles(element, styles) {
  //     Object.assign(element.style, styles);
  //   }


  //   /**
  //   * Removes all inline styles from the given element.
  //   * @param {HTMLElement} element - The DOM element from which to remove styles.
  //   */
  //   resetStyles(element) {
  //     element.removeAttribute('style');
  //   }


  //   /**
  //   * Sets the content and styles for the contact display.
  //   * @param {HTMLElement} contactContent - The DOM element where the contact information will be displayed.
  //   * @param {Object} contact - The contact object containing the details to be displayed.
  //   * @param {Function} getInitials - The  to generate initials from the contact's name.
  //   */
  //   setContactContent(contactContent, contact, getInitials) {
  //     contactContent.style.right = '0';
  //     contactContent.innerHTML =  this.renderContact(contact, getInitials(contact.name).join(''));
  //   }


  //   /**
  //   * Applies mobile-specific styles to the contactMobile element.
  //   * @param {HTMLElement} contactMobile - The DOM element to which styles will be applied.
  //   */
  //   setContactMobileStyles(contactMobile) {
  //     this.applyStyles(contactMobile, {
  //       display: 'flex',
  //       width: '100%',
  //       height: '100%',
  //       position: 'fixed',
  //       left: '0',
  //       right: '0',
  //       top: '0',
  //       zIndex: '1100',
  //       backgroundColor: '#F6F7F8',
  //       alignItems: 'center',
  //       justifyContent: 'center'
  //     });
  //   }


  //   /**
  //   * Sets styles for the back button.
  //   * @param {HTMLElement} back - The DOM element representing the back button.
  //   */
  //   setBackStyles(back) {
  //     this.applyStyles(back, {
  //       display: 'block',
  //       position: 'absolute',
  //       top: '150px',
  //       right: '60px'
  //     });
  //   }


  //   /**
  //   * Sets styles for mobile view.
  //   * @param {HTMLElement} contactMobile - The DOM element representing the mobile contact view.
  //   * @param {HTMLElement} back - The DOM element representing the back button.
  //   */
  //   setMobileViewStyles(contactMobile, back) {
  //     this.setContactMobileStyles(contactMobile);
  //     this.setBackStyles(back);
  //   }


  //   /**
  //   * Adds an event listener to the back button to reset styles.
  //   * @param {HTMLElement} back - The DOM element representing the back button.
  //   * @param {HTMLElement} contactMobile - The DOM element representing the mobile contact view.
  //   */
  //   addBackEventListener(back, contactMobile) {
  //     back.addEventListener('click', () => {
  //       this.resetStyles(contactMobile);
  //       this.resetStyles(back);
  //     });
  //   }


  //   /**
  //   * Displays the contact information based on the given index.
  //   * @param {number} index - The index of the contact to be displayed.
  //   */
  //   showContact(index) {
  //     const contactMobile = document.getElementById('contact-m');
  //     const contact = contactsArray[index];
  //     const contactContent = document.getElementById('contact-content');
  //     const back = document.getElementById('back-to-contancts');

  //     this.setContactContent(contactContent, contact, getInitials);

  //     if (window.innerWidth <= 1024) {
  //       this.setMobileViewStyles(contactMobile, back);
  //       this.addBackEventListener(back, contactMobile);
  //     }
  //   }


  //   /**
  //   * Deletes a contact from the contacts list in LocalStorage and refreshes the contacts list and the page.
  //   * @param {Object} contact - The contact to be deleted.
  //   * @async
  //   */
  //   async deleteContact(contact) {
  //     try {
  //       let contacts = JSON.parse(await getItem('contacts')) || [];
  //       contacts = contacts.filter(item => item.id !== contact.id);
  //       await setItem('contacts', JSON.stringify(contacts));
  //       this.getContacts();
  //       window.location.reload();
  //     } catch (error) {
  //       console.error("Error deleting contact:", error);
  //     }
  //   }


  //   /**
  //   * Generates a random RGB color.
  //   * @return {string} The random RGB color.
  //   */
  //   getRandomColor() {
  //     const colorValues = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256));
  //     return `rgb(${colorValues.join(', ')})`;
  //   }


  //   /**
  //   * Gets the initials of a name.
  //   * @param {string} name - The name.
  //   * @return {Array} An array with the first and second initial.
  //   */
  //   getInitials(name) {
  //     const [firstWord = '', secondWord = ''] = name.split(' ');
  //     return [firstWord[0] || '', secondWord[0] || ''];
  //   }
}
