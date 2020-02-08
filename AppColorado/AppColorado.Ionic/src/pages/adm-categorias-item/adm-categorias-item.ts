import { ServicoProvider } from './../../providers/servico/servico';
import { ProdutoProvider } from './../../providers/produto/produto';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController, private alertSrv: AlertProvider, private categoriaSrv: CategoriaItemProvider, private produtoSrv: ProdutoProvider, private servicoSrv: ServicoProvider, private usuarioSrv: UsuarioProvider) {
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

    if(this.tipo == 'Produto') {
      mask = 'Cosméticos, Brinquedos, Laticínios...';
    }
    else {
      mask = 'Cortes de cabelo, Aulas de Percussão...';
    }

    if(!categoria._id) {
      categoria = new CategoriaItemModel();

      categoria.comercio = this.comercioId;
      categoria.tipo = this.tipo;

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
    else {
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
            text: 'Excluir Categoria',
            handler: async data => {
              let encontrou = await this.verificarCadastroCategoriaItem(categoria);

              if(encontrou) {
                // prompt.setMessage('Erro ao tentar excluir a categoria. Você tem produtos/serviços cadastrados nessa categoria.'.fontcolor('red'));
                this.alertSrv.alert('Erro ao tentar excluir a categoria.', ' Você tem produtos/serviços cadastrados nessa categoria.');
                return false;
              }
              
              this.excluir(categoria);
            }
          },
          {
            text: 'Salvar',
            handler: data => {
              if(data.categoria == '') {
                prompt.setMessage('A categoria não pode ser vazia.'.fontcolor('red'));
                return false;
              }  

              categoria.nome = data.categoria;
              this.salvar(categoria);
            }
          }
        ]
      });
      prompt.present();
    }
  }

  private async verificarCadastroCategoriaItem(categoria: CategoriaItemModel): Promise<boolean> {
    let encontrado = false;

    if(categoria.tipo == 'Produto') {
      let produtosResult = await this.produtoSrv.produtosByCategoria(categoria._id);

      if(produtosResult.success) {
        let lista = <Array<any>>produtosResult.data;

        if(lista.length > 0) {
          encontrado = true;
        }
      }
    }
    else {
      let servicosResult = await this.servicoSrv.servicosByCategoria(categoria._id);

      if(servicosResult.success) {
        let lista = <Array<any>>servicosResult.data;

        if(lista.length > 0) {
          encontrado = true;
        }
      }
    }

    return encontrado;
  }

  private async excluir(categoria: CategoriaItemModel): Promise<void> {
    this.alertSrv.confirm('Excluir?', `Deseja realmente excluir a categoria ${categoria.nome}?`, async () => {
      let deleteResult = await this.categoriaSrv.delete(categoria._id);

      if(deleteResult.success) {
        this.salvou = true;
        this.alertSrv.toast('Categoria excluída com sucesso!', 'bottom');
        this._loadData();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss(this.salvou);
  }

}
