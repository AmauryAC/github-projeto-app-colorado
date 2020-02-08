import { ConfigHelper } from './../../app/helpers/configHelper';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComercioModel } from '../../app/models/comercioModel';
import { ComercioProvider } from '../../providers/comercio/comercio';

/**
 * Generated class for the AdmComerciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-comercios',
  templateUrl: 'adm-comercios.html',
})
export class AdmComerciosPage {

  usuario: UsuarioModel = new UsuarioModel();
  lista: Array<ComercioModel> = new Array<ComercioModel>();
  isLoading: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private comercioSrv: ComercioProvider) {
  }

  ionViewWillEnter() {
    this.usuario = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user));
    this.isLoading = true;
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let comercioResult = await this.comercioSrv.comerciosByUsuario(this.usuario._id);

    if(comercioResult.success) {
      this.isLoading = false;
      this.lista = <Array<ComercioModel>>comercioResult.data;
      
      this.lista.forEach(x => {
        if(!x.foto) {
          x.foto = ConfigHelper.noPhoto;
        }
      });
    }
  }

  addOrEdit(model?: ComercioModel): void {
    this.navCtrl.push('AdmComercioPage', { _usuario: this.usuario, _comercio: model });
  }

  gerenciarProdutos(item: ComercioModel): void {
    this.navCtrl.push('AdmProdutosPage', { _comercioId: item._id });
  }

  gerenciarServicos(item: ComercioModel): void {
    this.navCtrl.push('AdmServicosPage', { _comercioId: item._id });
  }

}
