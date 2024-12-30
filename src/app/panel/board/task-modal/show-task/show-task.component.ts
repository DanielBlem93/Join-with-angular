import { Component } from '@angular/core';
import { HelpersService } from '../../../../services/helpers.service';
import { FirebaseService } from '../../../../services/firebase.service';
import { Tasks } from '../../../../interfaces/tasks';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { GetInitalsPipe } from '../../../../pipes/get-initals.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-task',
  standalone: true,
  imports: [GetInitalsPipe,CommonModule],
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.scss'
})
export class ShowTaskComponent {
  
 constructor(public helpers: HelpersService, private fireService: FirebaseService) { }





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
      this.helpers.closeModal()
      this.helpers.toggleMsg('Task deleted')

    } catch (error) {
      console.error('Error deleting contact: ', error);
      this.helpers.toggleMsg('Somzthing went wrong')
    }
  }


 


   editTask() {
    this.helpers.modalControls.showTaskMode = false;
    this.helpers.modalControls.editTaskMode = true;
  }

}
