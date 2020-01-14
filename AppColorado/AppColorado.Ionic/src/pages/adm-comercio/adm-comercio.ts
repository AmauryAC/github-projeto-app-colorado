import { UsuarioModel } from './../../app/models/usuarioModel';
import { CategoriaProvider } from './../../providers/categoria/categoria';
import { AlertProvider } from './../../providers/alert/alert';
import { CameraProvider } from './../../providers/camera/camera';
import { CategoriaModel } from './../../app/models/categoriaModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { ComercioModel } from '../../app/models/comercioModel';
import { ComercioProvider } from '../../providers/comercio/comercio';

/**
 * Generated class for the AdmComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-comercio',
  templateUrl: 'adm-comercio.html',
})
export class AdmComercioPage {

  usuario: UsuarioModel;
  comercio: ComercioModel;
  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();
  tipos: Array<string> = new Array<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public platform: Platform, private cameraSrv: CameraProvider, private alertSrv: AlertProvider, private comercioSrv: ComercioProvider, private categoriaSrv: CategoriaProvider) {
    let _comercio = this.navParams.get('_comercio');

    this.usuario = <UsuarioModel>this.navParams.get('_usuario');

    if(_comercio && _comercio._id) {
      this.comercio = <ComercioModel>_comercio;
      this.comercio.categoria = _comercio.categoria._id;
    }
    else {
      this.comercio = new ComercioModel();
    }

    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let categoriasResult = await this.categoriaSrv.get();

    if(categoriasResult.success) {
      this.categorias = <Array<CategoriaModel>>categoriasResult.data;
    }

    this.tipos = ['Vendedor de Produtos', 'Prestador de Serviços'];
  }

  async salvar(): Promise<void> {
    let sucesso = false;

    if(!this.comercio._id) {
      this.comercio.usuario = this.usuario;

      let cadastroResult = await this.comercioSrv.post(this.comercio);
      sucesso = cadastroResult.success;
    }
    else {
      let updateResult = await this.comercioSrv.put(this.comercio._id, this.comercio);
      sucesso = updateResult.success;
    }

    if(sucesso) {
      this.alertSrv.toast('Comercio salvo com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmComerciosPage');
    }
  }

  async excluir(): Promise<void> {
    this.alertSrv.confirm('Excluir?', `Deseja realmente excluir o comércio ${this.comercio.nome}?`, async () => {
      let deleteResult = await this.comercioSrv.delete(this.comercio._id);

      if(deleteResult.success) {
        this.alertSrv.toast('Comércio excluído com sucesso!', 'bottom');
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
              this.comercio.foto = photo;
            })
          },
          icon: this.platform.is('ios') ? null : 'camera'
        },
        {
          text: 'Pegar Galeria',
          handler: () => {
            this.cameraSrv.getPictureFromGalery(photo => {
              this.comercio.foto = photo;
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

}
