import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HelpersService } from '../../../services/helpers.service';
import { GetInitalsPipe } from '../../../pipes/get-initals.pipe';
import { Tasks } from '../../../interfaces/tasks';
import { FirebaseService } from '../../../services/firebase.service';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { MsgBoxComponent } from '../../../msg-box/msg-box.component';
import { msgBoxAnimation } from '../../../animations/msgBox.animations';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, GetInitalsPipe, MsgBoxComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
  animations: [msgBoxAnimation]
})
export class TaskModalComponent {



  constructor(public helpers: HelpersService, private fireService: FirebaseService) { }


  doNotClose(event: Event): void {
    event.stopPropagation();


  }

  

  async updateSubtaskStatus(task: Tasks, subtaskIndex: number, isChecked: boolean) {
    let docRef = await this.fireService.getDocRef(this.fireService.tasksDatabase, task.docId);
    task.subtasks[subtaskIndex].check = isChecked;
    await updateDoc(docRef, { subtasks: task.subtasks });
  }


  async deleteTask(task: Tasks) {

    try {
      const taskDocRef = doc(this.fireService.firestore, 'tasks', task.docId);
      await deleteDoc(taskDocRef);
      console.log(`task with id ${task.docId} deleted`);
      this.helpers.isModalClosed = true;
    } catch (error) {
      console.error('Error deleting contact: ', error);
    }
  }

  async editTask() {
    this.helpers.toggleMsg('test')
  }




}
