import { UtilsHelper } from './../../app/helpers/utilsHelper';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<any>, args: string) {
    let _ret = [];

    _ret = <Array<any>>UtilsHelper.data.filter(value, args);

    return _ret;
  }
}
