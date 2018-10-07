import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getLink' })
export class FormatStringPipe implements PipeTransform {
  transform(value: string): string {
    const httpsRegExp = /((http|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const regExp = httpsRegExp.exec(value);
    if (regExp !== null) {
      if (regExp[0].startsWith('http')) {
        return regExp[0];
      } else {
        return 'http://' + regExp[0];
      }
    } else {
      return '';
    }
  }
}
