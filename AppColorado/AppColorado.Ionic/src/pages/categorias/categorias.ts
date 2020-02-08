import { ConfigHelper } from './../../app/helpers/configHelper';
import { CategoriaModel } from './../../app/models/categoriaModel';
import { CategoriaProvider } from './../../providers/categoria/categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  searchQuery: string = '';
  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();
  categoriasOri: Array<CategoriaModel> = new Array<CategoriaModel>();
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private categoriaSrv: CategoriaProvider) {
  }

  ionViewWillEnter() {
    this._loadData();
    console.log(this.navCtrl);
  }
  
  private async _loadData(): Promise<void> {
    let categoriaResult = await this.categoriaSrv.get();

    if(categoriaResult.success) {
      this.categorias = <Array<CategoriaModel>>categoriaResult.data;

      this.categorias.forEach(x => {
        if(!x.foto) {
          x.foto = ConfigHelper.noPhoto;
        }
      });

      this.categoriasOri = this.categorias;
    }
  }

  getItems(ev: any) {
    this.categorias = this.categoriasOri;

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.categorias = this.categorias.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  mostrarComerciosPorCategoria(item: CategoriaModel) {
    localStorage.setItem(ConfigHelper.storageKeys.selectedCategory, JSON.stringify(item));
    this.navCtrl.push('ComerciosPage');
  }

}
