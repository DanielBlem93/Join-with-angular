import { Component, Input, } from '@angular/core';
import { CompletedSubtasksPipe } from '../../../../pipes/completed-subtasks.pipe';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../../../interfaces/tasks';
import { GetInitalsPipe } from '../../../../pipes/get-initals.pipe';
import { FirebaseService } from '../../../../services/firebase.service';
import { Status } from '../../../../interfaces/status';
import { updateDoc } from 'firebase/firestore';
import { HelpersService } from '../../../../services/helpers.service';


@Component({
  selector: 'app-todo-box',
  standalone: true,
  imports: [CompletedSubtasksPipe, CommonModule, GetInitalsPipe],
  templateUrl: './todo-box.component.html',
  styleUrl: './todo-box.component.scss'
})
export class TodoBoxComponent {

  @Input() task!: Tasks;
  @Input() arrayName: string = "";




  constructor(private fireService: FirebaseService, public helpers: HelpersService) { }

  async changeStatus(event: Event, direction: 'up' | 'down') {
  
    const statusOrder: Status[] = ['todo', 'in-progress', 'awaiting-feedback', 'done'];
    let currentIndex = statusOrder.indexOf(this.task.status);

    if (direction === 'up' && currentIndex > 0) {
      currentIndex--;
    } else if (direction === 'down' && currentIndex < statusOrder.length - 1) {
      currentIndex++;
    }

    const newStatus = statusOrder[currentIndex];
    this.task.status = newStatus;

    let docRef = await this.fireService.getDocRef(this.fireService.tasksDatabase, this.task.docId);
    await updateDoc(docRef, { status: this.task.status });
  }





}
