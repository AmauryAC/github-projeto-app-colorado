import { EnderecoProvider } from './../../providers/endereco/endereco';
import { EnderecoModel } from './../../app/models/enderecoModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AdmEnderecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-endereco',
  templateUrl: 'adm-endereco.html',
})
export class AdmEnderecoPage {

  autocomplete: any;
  autocompleteItems: Array<any>;

  endereco: EnderecoModel = new EnderecoModel();

  uf: Array<String> = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  selecionado: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private enderecoSrv: EnderecoProvider, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.endereco = <EnderecoModel>this.navParams.data;
    console.log(this.navParams.data);
    console.log(this.endereco);
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  async updateSearchResults(): Promise<void> {  
    this.autocompleteItems = await this.enderecoSrv.updateSearchResults(this.autocomplete); 
  }

  selectSearchResult(item: any): void {
    this.endereco = this.enderecoSrv.selectSearchResult(item);
    this.autocompleteItems = [];
    this.selecionado = true;
  }

  salvar(): void {
    if(this.validarCampos()) {
      this.dismiss(this.endereco);
      return;
    }

    this.alertCtrl.create({
      title: 'Erro ao gravar o endereço.',
      message: 'Preencha todos os campos obrigatórios.',
      buttons: ['OK']
    }).present();    
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  validarCampos(): boolean {
    if(this.endereco.logradouro == '' || this.endereco.numero == null || this.endereco.bairro == '' || this.endereco.cidade == '' || this.endereco.uf == '') {
      return false;
    }

    return true;
  }

  limparCampos(): void {
    this.autocomplete = { input: '' };

    this.endereco.logradouro = '';
    this.endereco.numero = null;
    this.endereco.complemento = '';
    this.endereco.bairro = '';
    this.endereco.cidade = '';
    this.endereco.uf = '';
    this.endereco.cep = '';

    this.autocompleteItems = [];
    this.selecionado = false;
  }

}
