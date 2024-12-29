import { Component } from '@angular/core';
import { CompletedSubtasksPipe } from '../../../pipes/completed-subtasks.pipe';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../../interfaces/tasks';
import { FirebaseService } from '../../../services/firebase.service';
import { Status } from '../../../interfaces/status';
import { HelpersService } from '../../../services/helpers.service';
import { Task } from '../../../models/task.class';
import { onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { TodoBoxComponent } from "../todo-box/todo-box.component";

@Component({
  selector: 'app-drag-area',
  standalone: true,
  imports: [CompletedSubtasksPipe, CommonModule, TodoBoxComponent],
  templateUrl: './drag-area.component.html',
  styleUrl: './drag-area.component.scss'
})
export class DragAreaComponent {
  currentTask?: Tasks;
  draggedTask: any;
  sourceArray: any[] = [];

  tasks: Tasks[];
  todos: Tasks[] = []
  inProgress: Tasks[] = []
  awaitingFeedback: Tasks[] = []
  done: Tasks[] = []

  private unsubscribe: Unsubscribe | undefined;

  constructor(public fireService: FirebaseService, public helpers: HelpersService) {
    this.tasks = [];
  }



  async ngOnInit(): Promise<void> {
    this.subscribeToTasks();
  }


  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  /**
   * Subscribe to tasks from the database
   */
  subscribeToTasks() {

    onSnapshot(this.fireService.tasksDatabase, (snapshot) => {
      this.tasks = snapshot.docs.map(doc => doc.data() as Tasks);
      this.filterTasks();
    });
  }


  /**
   * Filter tasks by status
   */
  filterTasks() {
    this.todos = this.tasks.filter(task => task.status === 'todo');
    this.inProgress = this.tasks.filter(task => task.status === 'in-progress');
    this.awaitingFeedback = this.tasks.filter(task => task.status === 'awaiting-feedback');
    this.done = this.tasks.filter(task => task.status === 'done');
  }



  /**
    *  Drag and drop functions
    * @param event The DragEvent
    * @param task  The task to be dragged
    * @param sourceArrayName   The name of the array from which the task is dragged
    */
  onDragStart(event: DragEvent, task: any, sourceArrayName: 'todos' | 'inProgress' | 'awaitingFeedback' | 'done') {
    
    this.draggedTask = task;
    this.sourceArray = this[sourceArrayName as keyof DragAreaComponent];
  }


  /**
   *  Prevent the default behavior of the browser
   * @param event   The DragEvent
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }


  /**
   *  Drop the task in the target array and change the status of the task
   * @param event   The DragEvent
   * @param targetArrayName   The name of the array in which the task is dropped
   * @param status  The new status of the task
   */
  async onDrop(event: DragEvent, targetArrayName: 'todos' | 'inProgress' | 'awaitingFeedback' | 'done', status: Status) {
    event.preventDefault();
    if (this.draggedTask) {
      this.handleDrop(targetArrayName);
      await this.changeTaskStatus(this.draggedTask, status);
    }
  }


  /**
   *  Drop the task in the target array
   * @param targetArrayName   The name of the array in which the task is dropped
   */
  handleDrop(targetArrayName: string) {
    const targetArray = this[targetArrayName as keyof DragAreaComponent] as Tasks[];

    const index = this.sourceArray.indexOf(this.draggedTask);
    if (index > -1) {
      this.sourceArray.splice(index, 1);
    }

    targetArray.push(this.draggedTask);
  }


  /**
   *  Change the status of the task
   * @param task  The task to be updated
   * @param status  The new status of the task
   */
  async changeTaskStatus(task: Tasks, status: Status) {
    let docRef = await this.fireService.getDocRef(this.fireService.tasksDatabase, task.docId);
   task.status =status
    await updateDoc(docRef, {status: task.status});;
  }


  /**
   * Reset the dragged task and the source array
   */
  onDragEnd() {
    this.draggedTask = null;
    this.sourceArray = [];
  }


  showTask(task: Tasks) {
    this.currentTask = task;
  }


  toggleModalBoard(task: Tasks): void {
    this.helpers.isModalClosed = !this.helpers.isModalClosed;
    this.helpers.currentTask = task;
  }

  closeModalBoard(): void {
    this.helpers.isModalClosed = true;
  }

}
