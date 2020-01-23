import { ComercioModel } from './../../app/models/comercioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the DetalhesComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-comercio',
  templateUrl: 'detalhes-comercio.html',
})
export class DetalhesComercioPage {

  comercio: ComercioModel = new ComercioModel();
  segment: string = "informacoes";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.comercio = <ComercioModel>this.navParams.data;
    console.log(this.comercio);
    console.log(this.comercio.estabFixo);
  }

  showPrompt(contato: any) {
    let mensagem = contato.contato;

    if(mensagem == '')
      mensagem = 'Contato não inserido.';

    this.alertCtrl.create({
      title: contato.tipo,
      message: mensagem,
      buttons: ['OK']
    }).present();   
  }

}
