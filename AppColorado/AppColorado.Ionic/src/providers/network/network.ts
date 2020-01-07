import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class NetworkProvider {

  constructor(private platform: Platform) {
    
  }

  public get IsOnline(): boolean {
    if(this.platform.is('cordova')) {
      if(navigator.connection && navigator.connection.type)
        return (navigator.connection.type != Connection.UNKNOWN && navigator.connection.type != Connection.NONE);
      else
        return true;
    }
    else {
      return navigator.onLine;
    }
  }

}
