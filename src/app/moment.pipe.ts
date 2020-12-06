import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
moment.locale('ja');

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {
  transform(date: Date | string, format: string = 'YYYY/MM/DD HH:mm'): string {
    let num = parseInt((date as string));
    if (Number.isNaN(num)) {
      const m = moment(date);
      return m.format(format);
    } else {
      if ((date as string).length === 10) {
        num = num * 1000;
      }
      const m = moment(num);
      return m.format(format);
    }
  }
}
