import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tasks } from '../interfaces/tasks';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  currentTask: Tasks = new Task();

  currentMessage: string = 'Contact succesfuly created'
  public isOpen: boolean = false
  public modalControls: {
    isModalClosed: boolean;
    modalToggleAnimation: boolean;
    addTaskMode: boolean;
    editTaskMode: boolean;
    showTaskMode: boolean;
  }


  constructor(public router: Router) {
    this.modalControls = {
      isModalClosed: true,
      modalToggleAnimation: false,
      addTaskMode: false,
      editTaskMode: false,
      showTaskMode: false
    }
  }


  doNotClose(event: Event) {
    this.modalControls.isModalClosed = false;
  }



  closeModal() {
    this.modalControls.isModalClosed = true;
    this.modalControls.modalToggleAnimation = false;
    setTimeout(() => {
      this.modalControls.addTaskMode = false;
      this.modalControls.editTaskMode = false;
      this.modalControls.showTaskMode = false;
    }, 200);
  }

  toggleShowTask(task: Tasks) {
    this.currentTask = task;
    this.modalControls.isModalClosed = !this.modalControls.isModalClosed;
    this.modalControls.modalToggleAnimation = !this.modalControls.modalToggleAnimation
    this.modalControls.showTaskMode = !this.modalControls.showTaskMode
  }

  openAddTaskModal() {
    this.modalControls.addTaskMode = true;
    this.modalControls.isModalClosed = !this.modalControls.isModalClosed;
    this.modalControls.modalToggleAnimation = !this.modalControls.modalToggleAnimation
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


}
