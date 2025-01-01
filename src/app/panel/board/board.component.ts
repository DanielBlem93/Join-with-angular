import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { HelpersService } from '../../services/helpers.service';
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { DragAreaComponent } from "./drag-area/drag-area.component";
import { modalAnimation } from '../../animations/modal.animation';
import { Tasks } from '../../interfaces/tasks';
import { onSnapshot, Unsubscribe } from 'firebase/firestore';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, DragAreaComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  animations: [modalAnimation]
})
export class BoardComponent {


  tasks: Tasks[] = [];
  todos: Tasks[] = [];
  inProgress: Tasks[] = [];
  awaitingFeedback: Tasks[] = [];
  done: Tasks[] = [];

  filteredTodos: Tasks[] = [];
  filteredInProgress: Tasks[] = [];
  filteredAwaitingFeedback: Tasks[] = [];
  filteredDone: Tasks[] = [];

  private unsubscribe: any;


  constructor(
    public fireService: FirebaseService,
    public helpers: HelpersService
  ) { }


  async ngOnInit() {
    this.subscribeToTasks();
  }


  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  /**
   * Subscribe to tasks from the database
   */
  subscribeToTasks() {
    this.unsubscribe = onSnapshot(this.fireService.tasksDatabase, (snapshot) => {
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

    this.filteredTodos = this.todos;
    this.filteredInProgress = this.inProgress;
    this.filteredAwaitingFeedback = this.awaitingFeedback;
    this.filteredDone = this.done;
  }


  /**
   * Search tasks by title or description
   * @param event The input event
   */
  searchTasks(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (searchTerm === '') {
      this.resetFilteredTasks();
    } else {
      this.filteredTodos = this.filterTasksByTerm(this.todos, searchTerm);
      this.filteredInProgress = this.filterTasksByTerm(this.inProgress, searchTerm);
      this.filteredAwaitingFeedback = this.filterTasksByTerm(this.awaitingFeedback, searchTerm);
      this.filteredDone = this.filterTasksByTerm(this.done, searchTerm);
    }
  }


  /**
   * Reset the filtered tasks
   */
  resetFilteredTasks() {
    this.filteredTodos = this.todos;
    this.filteredInProgress = this.inProgress;
    this.filteredAwaitingFeedback = this.awaitingFeedback;
    this.filteredDone = this.done;
  }

  
  /**
   * Filter tasks by search term
   * @param tasks The tasks to be filtered
   * @param searchTerm The search term
   */
  filterTasksByTerm(tasks: Tasks[], searchTerm: string): Tasks[] {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  }
}