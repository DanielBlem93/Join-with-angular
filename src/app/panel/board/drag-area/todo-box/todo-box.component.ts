import { AfterViewInit, Component, Input, OnInit, } from '@angular/core';
import { CompletedSubtasksPipe } from '../../../../pipes/completed-subtasks.pipe';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../../../interfaces/tasks';
import { GetInitalsPipe } from '../../../../pipes/get-initals.pipe';
import { FirebaseService } from '../../../../services/firebase.service';
import { Status } from '../../../../interfaces/status';
import { updateDoc } from 'firebase/firestore';
import { HelpersService } from '../../../../services/helpers.service';
import { ResponsiveService } from '../../../../services/responsive.service';
import { Task } from '../../../../models/task.class';


@Component({
  selector: 'app-todo-box',
  standalone: true,
  imports: [CompletedSubtasksPipe, CommonModule, GetInitalsPipe],
  templateUrl: './todo-box.component.html',
  styleUrl: './todo-box.component.scss'
})
export class TodoBoxComponent implements OnInit {

  @Input() task!: Tasks;
  @Input() arrayName: string = "";




  constructor(private fireService: FirebaseService,
    public helpers: HelpersService,
    public responsiveService: ResponsiveService
  ) {

  }
  ngOnInit(): void {
    if (!this.task) {
      this.task = new Task();
    }
  }




  /**
   *  Change the status of the task
   * @param direction - 'up' or 'down' to change the status
   */

  async changeStatus(direction: 'up' | 'down') {

  const statusOrder: Status[] = ['todo', 'in-progress', 'awaiting-feedback', 'done'];
  let currentIndex = statusOrder.indexOf(this.task.status);

  if (direction === 'up' && currentIndex > 0) {
    currentIndex--;
  } else if (direction === 'down' && currentIndex < statusOrder.length - 1) {
    currentIndex++;
  }

  const newStatus = statusOrder[currentIndex];
  this.task.status = newStatus;
  this.changeStatusOnDB()
}

  /**
   * Change the status of the task on the database
   */
  async changeStatusOnDB() {
  let docRef = await this.fireService.getDocRef(this.fireService.tasksDatabase, this.task.docId);
  await updateDoc(docRef, { status: this.task.status });
}




}
