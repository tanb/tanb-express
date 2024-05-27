import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import dayjs from 'dayjs';

dayjs.locale('ja');

@Pipe({
  standalone: true,
  name: 'dayjs',
})
export class DayjsPipe implements PipeTransform {
  transform(date: Date | string, format = 'YYYY/MM/DD HH:mm'): string {
    let num = parseInt(date as string);
    if (Number.isNaN(num)) {
      const d = dayjs(date);
      return d.format(format);
    }

    if ((date as string).length === 10) {
      num = num * 1000;
    }
    const d = dayjs(num);
    return d.format(format);
  }
}
