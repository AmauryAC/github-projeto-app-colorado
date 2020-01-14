import { UtilsHelper } from './../../app/helpers/utilsHelper';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<any>, args: string) {
    let _ret = [];
    let _args = args.replace('-', '');

    _ret = <Array<any>>UtilsHelper.data.sorting(value, _args);

    if(args.indexOf('-') > -1)
      _ret = _ret.reverse();

    return _ret;
  }
}
