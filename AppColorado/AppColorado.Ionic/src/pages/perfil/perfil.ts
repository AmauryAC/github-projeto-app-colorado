import { ConfigHelper } from './../../app/helpers/configHelper';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario: UsuarioModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user));
  }

  admCategorias(): void {
    this.navCtrl.push('AdmCategoriasPage');
  }

}
