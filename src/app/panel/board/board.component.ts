import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { getDocs, updateDoc } from 'firebase/firestore';
import { Tasks } from '../../interfaces/tasks';
import { CommonModule } from '@angular/common';
import { CompletedSubtasksPipe } from '../../pipes/completed-subtasks.pipe';
import { Task } from '../../models/task.class';
import { Status } from '../../interfaces/status';
import { MsgBoxComponent } from '../../msg-box/msg-box.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CompletedSubtasksPipe,],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {


  tasks: Tasks[];
  todos: Tasks[] = []
  inProgress: Tasks[] = []
  awaitingFeedback: Tasks[] = []
  done: Tasks[] = []

  currentTask?: Tasks;
  draggedTask: any;
  sourceArray: any[] = [];

  constructor(public fireService: FirebaseService) {
    this.tasks = [];
  }

  async ngOnInit(): Promise<void> {
    await this.getTasks();
    this.filterTasks();

  }

  /**
   * Get all tasks from the database
   */
  async getTasks() {
    const querySnapshot = await getDocs(this.fireService.tasksDatabase);
    querySnapshot.forEach((doc) => {
      this.tasks.push(doc.data() as Tasks);
    });
    console.log(this.tasks);
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
    this.sourceArray = this[sourceArrayName as keyof BoardComponent];
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
    const targetArray = this[targetArrayName as keyof BoardComponent] as Tasks[];

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
    let newTask = new Task(task);
    newTask.status = status;
    await updateDoc(docRef, newTask.toJSON());;
  }


  /**
   * Reset the dragged task and the source array
   */
  onDragEnd() {
    this.draggedTask = null;
    this.sourceArray = [];
  }

  isModalClosed: boolean = true;
  showTask(task: Tasks) {
    this.currentTask = task;
  }


  toggleModalBoard(task: Tasks): void {
    this.isModalClosed = !this.isModalClosed;
    this.currentTask = task;
  }

  closeModalBoard(): void {
    this.isModalClosed = true;
  }

}