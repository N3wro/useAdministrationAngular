import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByEmail'
})
export class OrderByEmailPipe implements PipeTransform {

  transform(value: any[]): any {

    return value.sort((a, b) =>
    {
      if (a.email>b.email)
        return 1
      else if (b.email> a.email)
      {
        return -1
      }
      else {
        return 0
      }
    })
  }

}
