import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tasks } from '../interfaces/tasks';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  currentTask: Tasks = new Task();

  public isOpen: boolean = false
  isModalClosed: boolean = true;

  constructor(public router: Router) { }

  currentMessage: string = 'Contact succesfuly created'


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
