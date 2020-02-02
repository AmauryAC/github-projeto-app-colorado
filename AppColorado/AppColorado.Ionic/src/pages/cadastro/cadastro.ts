import { CameraProvider } from './../../providers/camera/camera';
import { AlertProvider } from './../../providers/alert/alert';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, private usuarioSrv: UsuarioProvider, private alertSrv: AlertProvider, public actionSheetCtrl: ActionSheetController, public platform: Platform, private cameraSrv: CameraProvider,) {
  }

  async cadastrar(): Promise<void> {
    let cadastroResult = await this.usuarioSrv.register(this.usuario);

    if(cadastroResult.success) {
      this.alertSrv.toast('Cadastro realizado com sucesso!', 'bottom');
      this.navCtrl.setRoot('LoginPage');
    }
  }

  cancelar(): void {
    this.navCtrl.setRoot('LoginPage');
  }

  getPictureOptions(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Adicionar Foto',
      buttons: [
        {
          text: 'Tirar Foto',
          handler: () => {
            this.cameraSrv.takePicture(photo => {
              this.usuario.foto = photo;
            })
          },
          icon: this.platform.is('ios') ? null : 'camera'
        },
        {
          text: 'Pegar Galeria',
          handler: () => {
            this.cameraSrv.getPictureFromGalery(photo => {
              this.usuario.foto = photo;
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
