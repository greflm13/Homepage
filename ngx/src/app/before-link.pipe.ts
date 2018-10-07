import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beforeLink'
})
export class BeforeLinkPipe implements PipeTransform {
  transform(value: string, args?: any): string {
    const httpsRegExp = /((http|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const regExp = httpsRegExp.exec(value);
    if (regExp !== null) {
      return value.slice(0, value.indexOf(regExp[0]));
    } else {
      return value;
    }
  }
}
