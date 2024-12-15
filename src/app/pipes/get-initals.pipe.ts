import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitals',
  standalone: true
})
export class GetInitalsPipe implements PipeTransform {

  transform(fullName: string): any {
    return fullName
      .split(" ")
      .map(n => n[0])
      .join("");
  }
}
