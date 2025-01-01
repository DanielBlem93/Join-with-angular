import { Component, ViewEncapsulation } from '@angular/core';
import { AddTaskComponent } from "../../../add-task/add-task.component";
import { HelpersService } from '../../../../services/helpers.service';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [AddTaskComponent],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddTaskModalComponent {
constructor(public helpers: HelpersService) {
  
}


showTask(){
  this.helpers.modalControls.showTaskMode = true;
  this.helpers.modalControls.addTaskMode = false;
  this.helpers.currentStatus = 'todo';
}
}
