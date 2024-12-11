import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { DropdownService } from '../../services/dropdown.service';
import { FirebaseService } from '../../services/firebase.service';
import { getDocs } from 'firebase/firestore';
import { AssignContacts } from '../../interfaces/assign-contacts';
import { AssignEmails } from '../../interfaces/assign-emails';

@Component({

  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {





  constructor(
    public ds: DropdownService,
    private elRef: ElementRef,
    public fireService: FirebaseService
  ) {



  }

  async ngOnInit(): Promise<void> {
    await this.getContactsFromDB()
  }

  ngOnDestroy(): void {

  }


  /**
   * Close Dropdown if you click outside of the dropdownmenu
   * @param event clickevent
   */
  @HostListener('window:click', ['$event'])
  onOutsideClick(event: Event): void {
    const dropdownMenu1 = this.elRef.nativeElement.querySelector('.dropdown-category');
    const dropdownMenu2 = this.elRef.nativeElement.querySelector('.dropdown-assinged-to');
    const isInsideDropdown1 = dropdownMenu1 && dropdownMenu1.contains(event.target);
    const isInsideDropdown2 = dropdownMenu2 && dropdownMenu2.contains(event.target);

    if (this.ds.catDropDownCtrl.open && !isInsideDropdown1) {
      this.ds.toggleDropdown('dropdown-category');
    }

    if (this.ds.assignDropDownCtrl.open && !isInsideDropdown2) {
      this.ds.toggleDropdown('dropdown-assinged-to');
    }
  }

  async getContactsFromDB() {
    const querySnapshot = await getDocs(this.fireService.contactsDatabase);
    querySnapshot.forEach((contact) => {
      const data = contact.data()
      const names = data['username'].split(" ");
      const obj  = {
        firstName: names[0],
        lastName: names[1],
        check: false,
        color: data['color']
      } 
      this.ds.assignDropDownCtrl.contacts.push(obj)
    });
    console.log(this.ds.assignDropDownCtrl.contacts);
  }

  toggleCheck(event: Event, index: number,): void {
    const btn = this.elRef.nativeElement.querySelector('#emails');
    const isInsideEmails = btn.contains(event.target);
    event.stopPropagation()
    this.ds.assignDropDownCtrl.contacts[index].check = !this.ds.assignDropDownCtrl.contacts[index].check;

    if (isInsideEmails) {
      this.ds.assignDropDownCtrl.emails[index].check = !this.ds.assignDropDownCtrl.emails[index].check;
    }
  }



}


