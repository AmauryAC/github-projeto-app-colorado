import { ConfigHelper } from './../../app/helpers/configHelper';
import { CategoriaModel } from './../../app/models/categoriaModel';
import { ComercioProvider } from './../../providers/comercio/comercio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComercioModel } from '../../app/models/comercioModel';

/**
 * Generated class for the ComerciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comercios',
  templateUrl: 'comercios.html',
})
export class ComerciosPage {

  categoriaSelecionada: CategoriaModel = new CategoriaModel();
  comercios: Array<ComercioModel> = new Array<ComercioModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private comercioSrv: ComercioProvider) {
  }

  ionViewWillEnter() {
    this.categoriaSelecionada = <CategoriaModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectedCategory));
    this._load();
    console.log(this.navCtrl);
  }

  private async _load(): Promise<void> {
    let comercioResult = await this.comercioSrv.comerciosByCategoria(this.categoriaSelecionada._id);

    if(comercioResult.success) {
      this.comercios = <Array<ComercioModel>>comercioResult.data;
    }
  }

}
