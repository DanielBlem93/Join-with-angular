import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompletedSubtasksPipe } from '../../../../pipes/completed-subtasks.pipe';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo-box',
  standalone: true,
  imports: [CompletedSubtasksPipe, CommonModule],
  templateUrl: './todo-box.component.html',
  styleUrl: './todo-box.component.scss'
})
export class TodoBoxComponent {
  @Input() task: any;
  @Input() arrayName: string ="";



  constructor() {
   
  }



 

}
