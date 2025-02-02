import { AfterContentChecked, AfterViewChecked, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../../interfaces/tasks';
import { FirebaseService } from '../../../services/firebase.service';
import { Status } from '../../../interfaces/status';
import { HelpersService } from '../../../services/helpers.service';
import { onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { TodoBoxComponent } from './todo-box/todo-box.component';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../../models/task.class';

@Component({
  selector: 'app-drag-area',
  standalone: true,
  imports: [CommonModule, TodoBoxComponent, DragDropModule],
  templateUrl: './drag-area.component.html',
  styleUrl: './drag-area.component.scss'
})
export class DragAreaComponent implements AfterContentChecked {
  currentTask?: Tasks;
  draggedTask: any;
  sourceArray: any[] = [];


  @Input() todos: Tasks[] = []
  @Input() inProgress: Tasks[] = []
  @Input() awaitingFeedback: Tasks[] = []
  @Input() done: Tasks[] = []
  isDragging: boolean = false;

  constructor(public fireService: FirebaseService, public helpers: HelpersService) { }

  ngAfterContentChecked(): void {
    this.sortTasks();
  }

  /**
   *  When the user starts dragging a task, set the isDragging property to true
   * @param event  The event object
   */
  onDragStart(event: CdkDragStart) {
    this.isDragging = true;
  }

  /**
   *  When the user stops dragging a task, set the isDragging property to false and sort the tasks
   * @param event   The event object
   */
  onDragEnd(event: CdkDragEnd) {
    this.isDragging = false;
    this.sortTasks(); //
  }

  /**
   *  When the user drops a task, move the task to the new container and update the task status
   * @param event  The event object
   */
  async drop(event: CdkDragDrop<Tasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      const newStatus = this.getStatusFromContainerId(event.container.id);
      await this.changeTaskStatus(task, newStatus);
    }
    this.sortTasks();
  }

  /**
   *  Get the status of the task based on the container ID
   * @param containerId  The container ID
   * @returns  The status of the task
   */
  private getStatusFromContainerId(containerId: string): Status {
    switch (containerId) {
      case 'open':
        return 'todo';
      case 'inProgress':
        return 'in-progress';
      case 'feedback':
        return 'awaiting-feedback';
      case 'done':
        return 'done';
      default:
        return 'todo';
    }
  }

  /**
   *  Change the status of a task
   * @param task  The task to change the status of
   * @param status  The new status of the task
   */
  async changeTaskStatus(task: Tasks, status: Status) {
    let docRef = await this.fireService.getDocRef(this.fireService.tasksDatabase, task.docId);
    task.status = status;
    await updateDoc(docRef, { status: task.status });
  }

  /**
   *  Show the task details
   * @param task  The task to show the details of
   */
  showTask(task: Task) {
    this.currentTask = task;
  }

  /**
   *  Hide the task details
   */
  private sortTasks() {
    const sortFunction = (a: Tasks, b: Tasks) => {
      const priorityOrder = { 'urgent': 1, 'medium': 2, 'low': 3 };

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return new Date(a.date).getTime() - new Date(b.date).getTime();
    };

    this.todos.sort(sortFunction);
    this.inProgress.sort(sortFunction);
    this.awaitingFeedback.sort(sortFunction);
    this.done.sort(sortFunction);
  }
}
