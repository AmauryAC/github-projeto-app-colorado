import { AdmCategoriasItemPage } from './../adm-categorias-item/adm-categorias-item';
import { CategoriaItemProvider } from './../../providers/categoria-item/categoria-item';
import { ServicoProvider } from './../../providers/servico/servico';
import { AlertProvider } from './../../providers/alert/alert';
import { CategoriaItemModel } from './../../app/models/categoriaItemModel';
import { ServicoModel } from './../../app/models/servicoModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the AdmServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-servico',
  templateUrl: 'adm-servico.html',
})
export class AdmServicoPage {

  servico: ServicoModel;
  comercioId: string;
  categorias: Array<CategoriaItemModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private alertSrv: AlertProvider, private servicoSrv: ServicoProvider, private categoriaSrv: CategoriaItemProvider) {
    let _servico = this.navParams.get('_servico');
    this.comercioId = this.navParams.get('_comercio');

    if(_servico && _servico._id) {
      this.servico = <ServicoModel>_servico;
      this.servico.categoria = _servico.categoria._id;
    }
    else {
      this.servico = new ServicoModel();
      this.servico.comercio = this.comercioId;
    }

    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let categoriasResult = await this.categoriaSrv.categoriasByComercio(this.comercioId);

    this.categorias = new Array<CategoriaItemModel>();

    if(categoriasResult.success) {
      categoriasResult.data.forEach(x => {
        if(x.tipo == 'Servico') {
          this.categorias.push(x);
        }
      });
      //this.categorias = <Array<CategoriaItemModel>>categoriasResult.data;
    }
  }

  async salvar(): Promise<void> {
    let sucesso = false;

    if(!this.servico._id) {
      let cadastroResult = await this.servicoSrv.post(this.servico);
      sucesso = cadastroResult.success;
    }
    else {
      let updateResult = await this.servicoSrv.put(this.servico._id, this.servico);
      sucesso = updateResult.success;
    }

    if(sucesso) {
      this.alertSrv.toast('Serviço salvo com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmComerciosPage');
    }
  }

  async excluir(): Promise<void> {
    this.alertSrv.confirm('Excluir?', `Deseja realmente excluir o serviço ${this.servico.nome}?`, async () => {
      let deleteResult = await this.servicoSrv.delete(this.servico._id);

      if(deleteResult.success) {
        this.alertSrv.toast('Serviço excluído com sucesso!', 'bottom');
        this.navCtrl.setRoot('AdmComerciosPage');
      }
    });
  }

  gerenciarCategorias(): void {
    let modal = this.modalCtrl.create(AdmCategoriasItemPage, { comercioId: this.comercioId, tipo: 'Servico' });

    modal.onDidDismiss(data => {
      if(data == true) {
        this._loadData();
      }
    });  
    
    modal.present();
  }

}
