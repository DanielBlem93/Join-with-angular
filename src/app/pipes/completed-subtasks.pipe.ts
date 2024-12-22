import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedSubtasks',
  standalone: true
})
export class CompletedSubtasksPipe implements PipeTransform {

  transform(subtasks: any[]): number {
    return subtasks.filter(subtask => subtask.check).length;
  }

}
