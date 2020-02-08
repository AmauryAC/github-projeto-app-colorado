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
  comerciosOri: Array<ComercioModel> = new Array<ComercioModel>();
  isLoading: boolean = true;

  filtros: Array<string>;
  filtro: String;
  valor: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private comercioSrv: ComercioProvider) {
    this.filtros = ['Nome', 'Bairro', 'Cidade', 'Área de Atuação'];
    this.filtro = '';
    this.valor = '';
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.categoriaSelecionada = <CategoriaModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectedCategory));
    this._load();
    console.log(this.navCtrl);
  }

  private async _load(): Promise<void> {
    let comercioResult = await this.comercioSrv.comerciosByCategoria(this.categoriaSelecionada._id);

    if(comercioResult.success) {
      this.isLoading = false;
      this.comercios = <Array<ComercioModel>>comercioResult.data;

      this.comercios.forEach(x => {
        if(!x.foto) {
          x.foto = ConfigHelper.noPhoto;
        }
        console.log(x);
      });

      this.comerciosOri = this.comercios;
    }
  }

  abrirDetalhesComercio(comercio: any): void {
    this.navCtrl.push('DetalhesComercioPage', comercio);
  }

  getItems(ev: any) {
    this.comercios = this.comerciosOri;

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.valor = val;
    }
    else {
      this.valor = val;
    }
  }

  limparFiltro(ev: any) {
    this.filtro = '';
    this.valor = '';
  }

}
