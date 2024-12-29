import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HelpersService } from '../../../services/helpers.service';
import { GetInitalsPipe } from '../../../pipes/get-initals.pipe';
import { Tasks } from '../../../interfaces/tasks';
import { FirebaseService } from '../../../services/firebase.service';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, GetInitalsPipe],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {



  constructor(public helpers : HelpersService, private fireService: FirebaseService) { }


 doNotClose(event: Event): void {
    event.stopPropagation();

 }

  closeModalBoard(): void {
    this.helpers.isModalClosed = true;
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
      } catch (error) {
        console.error('Error deleting contact: ', error);
      }
    }

}
