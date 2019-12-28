import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular/umd';

/*
  Generated class for the SpinnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpinnerProvider {

  private spinner: Loading = null;

  constructor(private loadingCtrl: LoadingController) {
    
  }

  public show(message: string): void {
    if(this.spinner == null) {
      this.spinner = this.loadingCtrl.create({
        content: (message || 'Carregando...')
      });
      this.spinner.present();
    }
    else {
      this.spinner.data.content = message;
    }
  }

  public hide(): void {
    this.spinner.dismiss();
    this.spinner = null;
  }

}
