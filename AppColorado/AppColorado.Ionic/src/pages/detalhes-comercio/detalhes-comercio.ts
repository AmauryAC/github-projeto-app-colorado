import { ServicoProvider } from './../../providers/servico/servico';
import { ProdutoProvider } from './../../providers/produto/produto';
import { ComercioModel } from './../../app/models/comercioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProdutoModel } from '../../app/models/produtoModel';
import { ServicoModel } from '../../app/models/servicoModel';

/**
 * Generated class for the DetalhesComercioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-comercio',
  templateUrl: 'detalhes-comercio.html',
})
export class DetalhesComercioPage {

  comercio: ComercioModel = new ComercioModel();
  segment: string = "informacoes";

  isLoading: boolean = true;
  categorias: Array<String>;
  produtos: Array<ProdutoModel> = new Array<ProdutoModel>();
  servicos: Array<ServicoModel> = new Array<ServicoModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private produtoSrv: ProdutoProvider, private servicoSrv: ServicoProvider) {
    this.comercio = <ComercioModel>this.navParams.data;
  }

  ionViewWillEnter() {
    this.isLoading = true;
    //this._loadProdutos();
  }

  showPrompt(contato: any) {
    let mensagem = contato.contato;

    if(mensagem == '')
      mensagem = 'Contato não inserido.';

    this.alertCtrl.create({
      title: contato.tipo,
      message: mensagem,
      buttons: ['OK']
    }).present();   
  }

  async loadProdutos(): Promise<void> {
    let produtosResult = await this.produtoSrv.produtosByComercio(this.comercio._id);

    this.categorias = new Array<String>();

    if(produtosResult.success) {
      this.isLoading = false;
      this.produtos = <Array<ProdutoModel>>produtosResult.data;
      
      this.produtos.forEach(x => {
        if(this.categorias.indexOf(x.categoria.nome) == -1) {
          this.categorias.push(x.categoria.nome);
        }
      });
    }
  }

  async loadServicos(): Promise<void> {
    let servicosResult = await this.servicoSrv.servicosByComercio(this.comercio._id);

    this.categorias = new Array<String>();

    if(servicosResult.success) {
      this.isLoading = false;
      this.servicos = <Array<ServicoModel>>servicosResult.data;
      
      this.servicos.forEach(x => {
        if(this.categorias.indexOf(x.categoria.nome) == -1) {
          this.categorias.push(x.categoria.nome);
        }
      });
    }
  }

}
