import { Component, Input } from '@angular/core';
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
export class DragAreaComponent {
  currentTask?: Tasks;
  draggedTask: any;
  sourceArray: any[] = [];


  @Input() todos: Tasks[] = []
  @Input() inProgress: Tasks[] = []
  @Input() awaitingFeedback: Tasks[] = []
  @Input() done: Tasks[] = []
  private dragTimeout: any;
  private isDragging: boolean = false;

  constructor(public fireService: FirebaseService, public helpers: HelpersService) { }

  ngOnInit(): void {
    this.sortTasks();
  }

  onDragStart(event: CdkDragStart) {
    this.isDragging = true;
  }

  onDragEnd(event: CdkDragEnd) {
    this.isDragging = false;
    this.sortTasks(); // Sortieren Sie die Tasks nach dem Drag-and-Drop
  }

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
    this.sortTasks(); // Sortieren Sie die Tasks nach dem Drag-and-Drop
  }

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

  async changeTaskStatus(task: Tasks, status: Status) {
    let docRef = await this.fireService.getDocRef(this.fireService.tasksDatabase, task.docId);
    task.status = status;
    await updateDoc(docRef, { status: task.status });
  }

  showTask(task: Task) {
    this.currentTask = task;
  }

  private sortTasks(): void {
    const sortFunction = (a: Tasks, b: Tasks) => {
      if (a.priority === b.priority) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      const priorityOrder = { 'urgent': 1, 'medium': 2, 'low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    };

    this.todos.sort(sortFunction);
    this.inProgress.sort(sortFunction);
    this.awaitingFeedback.sort(sortFunction);
    this.done.sort(sortFunction);
  }

}
