import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ContatoModel } from '../../app/models/contatoModel';

/**
 * Generated class for the AdmContatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-contatos',
  templateUrl: 'adm-contatos.html',
})
export class AdmContatosPage {

  contatos: Array<ContatoModel> = new Array<ContatoModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.contatos = this.navParams.data;
  }

  showPrompt(contato: ContatoModel) {
    let mask = '';
    let reg;

    if(contato.tipo == 'Telefone Fixo') {
      mask = '(xx)xxxx-xxxx';
      reg = new RegExp(/(\(?\d{2}\)?\s)?(\d{4}\-\d{4})/);
    }
    else if(contato.tipo == 'Telefone Celular') {
      mask = '(xx)9xxxx-xxxx';
      reg = new RegExp(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/);
    }
    else if(contato.tipo == 'Website') {
      mask = 'www.site.com.br';
    }

    const prompt = this.alertCtrl.create({
      title: contato.tipo,
      message: 'Entre com os dados do contato',
      inputs: [
        {
          name: 'contato',
          placeholder: `Exemplo: ${mask}`,
          value: contato.contato
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => { }
        },
        {
          text: 'Salvar',
          handler: data => {
            if(reg) {
              if(!this.validarTelefone(reg, data.contato)) {
                prompt.setMessage('O número digitado é inválido!!!'.fontcolor('red'));
                return false;
              }
            }            
            contato.contato = data.contato;
          }
        }
      ]
    });
    prompt.present();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.contatos);
  }

  validarTelefone(reg: RegExp, tel: string): boolean {
    return reg.test(tel);
  }

}
