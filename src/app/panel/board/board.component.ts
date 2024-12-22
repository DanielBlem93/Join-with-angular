import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { getDocs } from 'firebase/firestore';
import { Tasks } from '../../interfaces/tasks';
import { CommonModule } from '@angular/common';
import { CompletedSubtasksPipe } from '../../pipes/completed-subtasks.pipe';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CompletedSubtasksPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  tasks: Tasks[];
  todos: Tasks[] = []
  inProgress: Tasks[] = []
  awaitingFeedback: Tasks[] = []
  done: Tasks[] = []

  constructor(public fireService: FirebaseService) {
    this.tasks = [];
  }

  async ngOnInit(): Promise<void> {
    await this.getTasks();
    this.filterTasks();

  }


  async getTasks() {
    const querySnapshot = await getDocs(this.fireService.tasksDatabase);
    querySnapshot.forEach((doc) => {
      this.tasks.push(doc.data() as Tasks);
    });
    console.log(this.tasks);
  }

  filterTasks() {
    this.todos = this.tasks.filter(task => task.status === 'todo');
    this.inProgress = this.tasks.filter(task => task.status === 'in-progress');
    this.awaitingFeedback = this.tasks.filter(task => task.status === 'awaiting-feedback');
    this.done = this.tasks.filter(task => task.status === 'done');
  }
}
