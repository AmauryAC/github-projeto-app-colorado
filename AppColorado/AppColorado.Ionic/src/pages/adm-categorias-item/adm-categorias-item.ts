import { AlertProvider } from './../../providers/alert/alert';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { CategoriaItemProvider } from './../../providers/categoria-item/categoria-item';
import { CategoriaItemModel } from './../../app/models/categoriaItemModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the AdmCategoriasItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-categorias-item',
  templateUrl: 'adm-categorias-item.html',
})
export class AdmCategoriasItemPage {

  categorias: Array<CategoriaItemModel>;
  comercioId: string;
  tipo: string;

  salvou: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, private alertSrv: AlertProvider, private categoriaSrv: CategoriaItemProvider, private teste: UsuarioProvider) {
    this.comercioId = this.navParams.data.comercioId;
    this.tipo = this.navParams.data.tipo;

    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let categoriasResult = await this.categoriaSrv.categoriasByComercio(this.comercioId);

    this.categorias = new Array<CategoriaItemModel>();

    if(categoriasResult.success) {
      categoriasResult.data.forEach(x => {
        if(x.tipo == this.tipo) {
          this.categorias.push(x);
        }
      });
    }
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AdmCategoriasItemPage');
  }

  async salvar(categoria: CategoriaItemModel): Promise<void> {
    let sucesso = false;

    if(!categoria._id) {
      let cadastroResult = await this.categoriaSrv.post(categoria);
      sucesso = cadastroResult.success;
    }
    else {
      let updateResult = await this.categoriaSrv.put(categoria._id, categoria);
      sucesso = updateResult.success;
    }

    if(sucesso) {
      this.salvou = true;
      this.alertSrv.toast('Categoria salva com sucesso!', 'bottom');
      this._loadData();
    }
  }

  showPrompt(categoria?: CategoriaItemModel) {
    let mask = '';

    if(!categoria._id) {
      categoria = new CategoriaItemModel();

      categoria.comercio = this.comercioId;
      categoria.tipo = this.tipo;
    }

    if(categoria.tipo == 'Produto') {
      mask = 'Cosméticos, Brinquedos, Laticínios...';
    }
    else {
      mask = 'Cortes de cabelo, Aulas de Percussão...';
    }

    const prompt = this.alertCtrl.create({
      title: 'Categoria',
      message: 'Entre com os dados da categoria',
      inputs: [
        {
          name: 'categoria',
          placeholder: `Exemplo: ${mask}`,
          value: categoria.nome
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
            if(data.categoria == '') {
              prompt.setMessage('A categoria não pode ser vazia.'.fontcolor('red'));
              return false;
            }                      
            categoria.nome = data.categoria;
            console.log(categoria);
            this.salvar(categoria);
          }
        }
      ]
    });
    prompt.present();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.salvou);
  }

}
