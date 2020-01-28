import { ServicoProvider } from './../../providers/servico/servico';
import { ServicoModel } from './../../app/models/servicoModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdmServicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-servicos',
  templateUrl: 'adm-servicos.html',
})
export class AdmServicosPage {

  comercioId: string;
  lista: Array<ServicoModel> = new Array<ServicoModel>();
  isLoading: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicoSrv: ServicoProvider) {
    this.comercioId = this.navParams.get('_comercioId');
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let servicosResult = await this.servicoSrv.servicosByComercio(this.comercioId);

    if(servicosResult.success) {
      this.isLoading = false;
      this.lista = <Array<ServicoModel>>servicosResult.data;
    }
  }

  addOrEdit(model?: ServicoModel): void {
    this.navCtrl.push('AdmServicoPage', { _servico: model, _comercio: this.comercioId });
  }

}
