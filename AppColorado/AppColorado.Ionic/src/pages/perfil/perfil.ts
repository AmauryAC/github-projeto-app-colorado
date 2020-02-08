import { SpinnerProvider } from './../../providers/spinner/spinner';
import { AlertProvider } from './../../providers/alert/alert';
import { CameraProvider } from './../../providers/camera/camera';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';

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

  usuarioLogado: UsuarioModel = new UsuarioModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private cameraSrv: CameraProvider, private alertSrv: AlertProvider, private spinnerSrv: SpinnerProvider, private usuarioSrv: UsuarioProvider, private app: App) {
  }

  ionViewDidLoad() {
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    try {
      let user = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user));
      let userResult = await this.usuarioSrv.getById(user._id);

      if(userResult.success) {
        this.usuarioLogado = <UsuarioModel>userResult.data;

        if(!this.usuarioLogado.foto) {
          this.usuarioLogado.foto = ConfigHelper.noUserPhoto;
        }
      }
    } catch (error) {
      console.log('Erro ao carregar os dados do usuario.');
    }
  }

  async salvar(): Promise<void> {
    try {
      let salvarResult = await this.usuarioSrv.put(this.usuarioLogado._id, this.usuarioLogado);

      if (salvarResult.success) {
        this.alertSrv.toast('Dados atualizados com sucesso!', 'bottom');
      }
    } catch (error) {
      console.log('Erro ao atualizar os dados, motivo: ' + error);
    }
  }

  mudarFoto(): void {
    let action = this.actionSheetCtrl.create({
      title: 'Foto',
      buttons: [
        { text: 'Limpar', handler: () => { this.usuarioLogado.foto = ConfigHelper.noUserPhoto; } },
        {
          text: 'Tirar Foto', handler: () => {
            this.cameraSrv.getPictureFromGalery(photo => {
              this.usuarioLogado.foto = photo;
            });
          }
        },
        { text: 'Cancelar', handler: () => { }, role: 'destructive' }
      ]
    });
    action.present();
  }

  admCategorias(): void {
    this.navCtrl.push('AdmCategoriasPage');
  }

  logout(): void {
    this.spinnerSrv.show("Efetuando Logout...");

    setTimeout(() => {
      localStorage.removeItem(ConfigHelper.storageKeys.token);
      // this.navCtrl.setRoot('LoginPage');
      this.app.getRootNavs()[0].setRoot('LoginPage');
      
      this.spinnerSrv.hide();
    }, 2000);
  }

}
