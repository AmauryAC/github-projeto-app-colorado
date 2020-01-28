import { UtilsHelper } from './../../app/helpers/utilsHelper';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RealPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'real',
})
export class RealPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return UtilsHelper.number.formatCurrency(value);
  }
}
