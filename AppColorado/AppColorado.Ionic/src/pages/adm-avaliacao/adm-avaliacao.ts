import { UsuarioProvider } from './../../providers/usuario/usuario';
import { AlertProvider } from './../../providers/alert/alert';
import { AvaliacaoModel } from './../../app/models/avaliacaoModel';
import { AvaliacaoProvider } from './../../providers/avaliacao/avaliacao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AdmAvaliacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-avaliacao',
  templateUrl: 'adm-avaliacao.html',
})
export class AdmAvaliacaoPage {

  avaliacao: AvaliacaoModel;
  comercioId: string;
  usuarioId: string;

  salvou: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertSrv: AlertProvider, private avaliacaoSrv: AvaliacaoProvider, private usuarioSrv: UsuarioProvider) {
    let _avaliacao = this.navParams.get('_avaliacao');

    if(_avaliacao && _avaliacao._id) {
      this.avaliacao = <AvaliacaoModel>_avaliacao;
    }
    else {
      this.avaliacao = new AvaliacaoModel();

      this.comercioId = this.navParams.get('_comercioId');
      this.usuarioId = this.navParams.get('_usuarioId');  

      this.avaliacao.comercio = this.comercioId;
      this.avaliacao.usuario = this.usuarioId;
      this.avaliacao.estrelas = 0;
    }
  }

  async salvar(): Promise<void> {
    let sucesso = false;

    if(!this.avaliacao._id) {
      let cadastroResult = await this.avaliacaoSrv.post(this.avaliacao);
      sucesso = cadastroResult.success;
    }
    else {
      let updateResult = await this.avaliacaoSrv.put(this.avaliacao._id, this.avaliacao);
      sucesso = updateResult.success;
    }

    if(sucesso) {
      this.alertSrv.toast('Avaliação enviada com sucesso!', 'bottom');
      this.salvou = true;
      //this.navCtrl.setRoot('AdmComerciosPage');
      this.dismiss();
    }
  }

  ratingChange(rating) {
    console.log("changed rating: ", rating);
    this.avaliacao.estrelas = rating;
  }

  dismiss() {
    this.viewCtrl.dismiss(this.salvou);
  }

}
