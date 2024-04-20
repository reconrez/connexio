import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decending'
})
export class DecendingPipe implements PipeTransform {

  transform(arr) {
    var copy = arr.slice();
    return copy.reverse();
  }

}
