import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, } from '@angular/forms';
import { DropdownService } from '../../services/dropdown.service';
import { FirebaseService } from '../../services/firebase.service';
import { addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { GetInitalsPipe } from '../../pipes/get-initals.pipe';
import { Tasks } from '../../interfaces/tasks';
import { Task } from '../../models/task.class';
import { HelpersService } from '../../services/helpers.service';
import { AssignContacts } from '../../interfaces/assign-contacts';

@Component({

  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, GetInitalsPipe],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})


export class AddTaskComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm | undefined;
  @Output() taskAdded = new EventEmitter<void>();
  @ViewChild('dropdownCategory') dropdownCategory!: ElementRef;
  @ViewChild('dropdownAssignedTo') dropdownAssignedTo!: ElementRef;
  @Input() task!: Tasks;

  constructor(
    public ds: DropdownService,
    private elRef: ElementRef,
    public fireService: FirebaseService,
    public helpers: HelpersService
  ) { }


  async ngOnInit(): Promise<void> {
    this.reset()
    await this.getContactsFromDB()
    if (this.task) {
      this.populateForm(this.task);
    }
  }


  populateForm(task: Tasks): void {
    console.log('das ist der task', task)
    this.myForm?.controls['title'].setValue(task.title);
    this.myForm?.controls['description'].setValue(task.description);
    this.myForm?.controls['date'].setValue(task.date);
    this.myForm?.controls['priority'].setValue(task.priority);
    this.ds.subtasks = task.subtasks;
    // this.ds.assignDropDownCtrl.selectedEmails = task.assigendTo
    

    
 
    this.ds.assignDropDownCtrl.contacts.forEach(contact => {
      task.assigendTo.forEach(selectedContact => {
        if (contact.lastName === selectedContact.lastName && contact.firstName === selectedContact.firstName) {
          contact.check = true
          this.ds.assignDropDownCtrl.selectedEmails.push(contact)
        }
      });
    });

  }

  /**
   * Close Dropdown if you click outside of the dropdownmenu
   * @param event clickevent
   */
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    console.log('Click event:', event);
    const dropdownMenu1 = this.dropdownCategory.nativeElement;
    const dropdownMenu2 = this.dropdownAssignedTo.nativeElement;
    console.log('Dropdown 1:', dropdownMenu1);
    console.log('Dropdown 2:', dropdownMenu2);
    const isInsideDropdown1 = dropdownMenu1 && dropdownMenu1.contains(event.target);
    const isInsideDropdown2 = dropdownMenu2 && dropdownMenu2.contains(event.target);

    if (this.ds.catDropDownCtrl.open && !isInsideDropdown1) {
      this.ds.toggleDropdown('dropdown-category');
    }

    if (this.ds.assignDropDownCtrl.open && !isInsideDropdown2) {
      this.ds.toggleDropdown('dropdown-assinged-to');
    }
  }



  /**
   * Pulls data from the firebase DB
   */
  async getContactsFromDB() {
    const querySnapshot = await getDocs(this.fireService.contactsDatabase);
    querySnapshot.forEach((contact) => {
      const data = contact.data()
      const names = data['username'].split(" ");
      const obj = {
        firstName: names[0],
        lastName: names[1],
        check: false,
        color: data['color']
      }
      this.ds.assignDropDownCtrl.contacts.push(obj)
    });
    console.log(this.ds.assignDropDownCtrl.contacts);

  }


  /**
   * toggles the check input inside the assigend to dropdown 
   * @param event pointerevent
   * @param index 
   */
  toggleCheck(event: Event, index: number,): void {
    event.stopPropagation()
    this.ds.assignDropDownCtrl.contacts[index].check = !this.ds.assignDropDownCtrl.contacts[index].check;
    this.selectContact(index)
  }


  /**
   * Selects the contact from the dropdown
   * @param index  the index of the contact
   */
  selectContact(index: number) {
    const contact = this.ds.assignDropDownCtrl.contacts[index]
    if (contact.check) {
      this.ds.assignDropDownCtrl.selectedEmails.push(contact)
    } else {
      this.ds.assignDropDownCtrl.selectedEmails = this.ds.assignDropDownCtrl.selectedEmails.filter(
        selectedContact => selectedContact !== contact)
    }
  }


  /**
   * Adds a new subtask to the subtask array
   */
  addSubtask() {
    let task = {
      task: this.ds.subtask.trim(),
      check: false
    }

    if (this.ds.subtasks.length < 5 && task.task.length > 2) {
      this.ds.subtasks.push(task)
    } else if (task.task.length <= 2) {
      this.helpers.toggleMsg('Subtask is to short')
    }
    else {
      this.helpers.toggleMsg('Not more then 5 tasks allowed')
    }
  }


  /**
   *  Deletes a subtask from the subtask array
   * @param subtask   the subtask to delete
   */
  deleteSubtask(subtask: string) {
    this.ds.subtasks = this.ds.subtasks.filter(
      subtasks => subtasks.task !== subtask)
  }


  /**
   *  Submits the form
   * @param myForm  the form
   */
  async onSubmit(myForm: NgForm) {
    if (myForm.valid) {
      const task = new Task(this.getData())
      const taskJSON = task.toJSON()
      await this.addTasktoDB(taskJSON)
      this.reset()
    } else
      this.helpers.toggleMsg('Somthing went wrong')
  }


  /**
   *  Gets the data from the form
   * @returns   the data from the form
   */
  getData() {
    const task: Tasks = {
      title: this.ds.title,
      description: this.ds.description,
      category: this.ds.catDropDownCtrl.selectedName,
      categoryColor: this.ds.catDropDownCtrl.selectedColor,
      assigendTo: this.ds.assignDropDownCtrl.selectedEmails,
      date: this.ds.date,
      priority: this.ds.selectedPriority,
      subtasks: this.ds.subtasks,
      status: 'todo',
      docId: ''
    }
    return task
  }


  /**
   *  Adds a task to the firebase DB
   * @param data  the task to add
   */
  async addTasktoDB(data: Tasks) {
    try {
      const task = await addDoc(this.fireService.tasksDatabase, data);
      this.helpers.toggleMsg('Task added to board')
      this.helpers.redirectTo('/panel/board', 2500)
      await updateDoc(task, { docId: task.id })
      this.taskAdded.emit();
      console.log(data)
    } catch (error) {
      this.helpers.toggleMsg('Please fill out all fields correctly')
    }

  }


  /**
   * Resets the form
   */
  reset() {
    this.ds.title = '';
    this.ds.description = '';
    this.ds.selectedPriority = null;
    this.ds.catDropDownCtrl.selectedName = '';
    this.ds.catDropDownCtrl.newCatMode = false;
    this.ds.catDropDownCtrl.catSelected = false;
    this.ds.catDropDownCtrl.touched = false;
    this.ds.subtasks = [];
    this.resetSelectedContacts()
    if (this.myForm) {
      this.myForm.resetForm();
    }
  }


  /**
   * Resets the selected contacts
   */
  resetSelectedContacts() {
    this.ds.assignDropDownCtrl.selectedEmails = []
    this.ds.assignDropDownCtrl.contacts.forEach(contact => {
      contact.check = false
    });
  }

}
