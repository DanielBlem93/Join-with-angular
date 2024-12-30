import { Component,  Input,  } from '@angular/core';
import { CompletedSubtasksPipe } from '../../../../pipes/completed-subtasks.pipe';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../../../interfaces/tasks';
import { GetInitalsPipe } from '../../../../pipes/get-initals.pipe';


@Component({
  selector: 'app-todo-box',
  standalone: true,
  imports: [CompletedSubtasksPipe, CommonModule, GetInitalsPipe],
  templateUrl: './todo-box.component.html',
  styleUrl: './todo-box.component.scss'
})
export class TodoBoxComponent {
  @Input() task!: Tasks;
  @Input() arrayName: string ="";



  constructor() {
   
  }



 

}
