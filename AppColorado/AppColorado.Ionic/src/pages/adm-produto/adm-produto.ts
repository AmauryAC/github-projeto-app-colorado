import { AdmCategoriasItemPage } from './../adm-categorias-item/adm-categorias-item';
import { CategoriaItemProvider } from './../../providers/categoria-item/categoria-item';
import { ProdutoProvider } from './../../providers/produto/produto';
import { AlertProvider } from './../../providers/alert/alert';
import { CameraProvider } from './../../providers/camera/camera';
import { ProdutoModel } from './../../app/models/produtoModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';
import { CategoriaItemModel } from '../../app/models/categoriaItemModel';

/**
 * Generated class for the AdmProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-produto',
  templateUrl: 'adm-produto.html',
})
export class AdmProdutoPage {

  produto: ProdutoModel;
  comercioId: string;
  categorias: Array<CategoriaItemModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public platform: Platform, public modalCtrl: ModalController, private cameraSrv: CameraProvider, private alertSrv: AlertProvider, private produtoSrv: ProdutoProvider, private categoriaSrv: CategoriaItemProvider) {
    let _produto = this.navParams.get('_produto');
    this.comercioId = this.navParams.get('_comercio');

    if(_produto && _produto._id) {
      this.produto = <ProdutoModel>_produto;
      this.produto.categoria = _produto.categoria._id;
    }
    else {
      this.produto = new ProdutoModel();
      this.produto.comercio = this.comercioId;
    }

    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let categoriasResult = await this.categoriaSrv.categoriasByComercio(this.comercioId);

    this.categorias = new Array<CategoriaItemModel>();

    if(categoriasResult.success) {
      categoriasResult.data.forEach(x => {
        if(x.tipo == 'Produto') {
          this.categorias.push(x);
        }
      });
      //this.categorias = <Array<CategoriaItemModel>>categoriasResult.data;
    }
  }

  async salvar(): Promise<void> {
    let sucesso = false;

    if(!this.produto._id) {
      let cadastroResult = await this.produtoSrv.post(this.produto);
      sucesso = cadastroResult.success;
    }
    else {
      let updateResult = await this.produtoSrv.put(this.produto._id, this.produto);
      sucesso = updateResult.success;
    }

    if(sucesso) {
      this.alertSrv.toast('Produto salvo com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmComerciosPage');
    }
  }

  async excluir(): Promise<void> {
    this.alertSrv.confirm('Excluir?', `Deseja realmente excluir o produto ${this.produto.nome}?`, async () => {
      let deleteResult = await this.produtoSrv.delete(this.produto._id);

      if(deleteResult.success) {
        this.alertSrv.toast('Produto excluído com sucesso!', 'bottom');
        this.navCtrl.setRoot('AdmComerciosPage');
      }
    });
  }

  getPictureOptions(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Adicionar Foto',
      buttons: [
        {
          text: 'Tirar Foto',
          handler: () => {
            this.cameraSrv.takePicture(photo => {
              this.produto.foto = photo;
            })
          },
          icon: this.platform.is('ios') ? null : 'camera'
        },
        {
          text: 'Pegar Galeria',
          handler: () => {
            this.cameraSrv.getPictureFromGalery(photo => {
              this.produto.foto = photo;
            })
          },
          icon: this.platform.is('ios') ? null : 'images'
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {},
          icon: this.platform.is('ios') ? null : 'close'
        }
      ]
    });

    actionSheet.present();
  }

  gerenciarCategorias(): void {
    let modal = this.modalCtrl.create(AdmCategoriasItemPage, { comercioId: this.comercioId, tipo: 'Produto' });

    modal.onDidDismiss(data => {
      if(data == true) {
        this._loadData();
      }
    });  
    
    modal.present();
  }

}
