import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marker',
  standalone: true,
})
export class MarkerPipe implements PipeTransform {

  transform(value: string, substring: string | undefined): string {
    if (substring){
      const regex = new RegExp(substring, 'gi')
      const newString =
        value.replace(
          regex,
          `<span class="activeSubstring">$&</span>`
        );
      return newString;
    }
    return value;
  }
}
