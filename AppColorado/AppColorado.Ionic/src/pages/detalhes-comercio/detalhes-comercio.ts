import { AlertProvider } from './../../providers/alert/alert';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { AdmAvaliacaoPage } from './../adm-avaliacao/adm-avaliacao';
import { AvaliacaoProvider } from './../../providers/avaliacao/avaliacao';
import { ServicoProvider } from './../../providers/servico/servico';
import { ProdutoProvider } from './../../providers/produto/produto';
import { ComercioModel } from './../../app/models/comercioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { ProdutoModel } from '../../app/models/produtoModel';
import { ServicoModel } from '../../app/models/servicoModel';
import { AvaliacaoModel } from '../../app/models/avaliacaoModel';

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
  usuario: UsuarioModel;
  segment: string = "informacoes";

  isLoading: boolean = true;
  categorias: Array<String>;
  produtos: Array<ProdutoModel> = new Array<ProdutoModel>();
  servicos: Array<ServicoModel> = new Array<ServicoModel>();
  avaliacoes: Array<AvaliacaoModel> = new Array<AvaliacaoModel>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, private alertSrv: AlertProvider, private produtoSrv: ProdutoProvider, private servicoSrv: ServicoProvider, private avaliacaoSrv: AvaliacaoProvider) {
    this.comercio = <ComercioModel>this.navParams.data;
    this.usuario = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user));
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

  async loadAvaliacoes(): Promise<void> {
    let avaliacoesResult = await this.avaliacaoSrv.avaliacoesByComercio(this.comercio._id);

    if(avaliacoesResult.success) {
      this.isLoading = false;
      this.avaliacoes = <Array<AvaliacaoModel>>avaliacoesResult.data;
    }
    console.log(this.avaliacoes);
  }

  gerenciarAvaliacao(avaliacao?: any): void {
    let modal, novo;
    let avaliacaoOri = {};

    if(!avaliacao) {
      modal = this.modalCtrl.create(AdmAvaliacaoPage, { _comercioId: this.comercio._id, _usuarioId: this.usuario._id });

      novo = true;
    }
    else {
      // avaliacaoOri = avaliacao;
      Object.assign(avaliacaoOri, avaliacao);

      modal = this.modalCtrl.create(AdmAvaliacaoPage, { _avaliacao: avaliacao, _comercioId: this.comercio._id, _usuarioId: this.usuario._id });

      novo = false;
    }
    
    modal.onDidDismiss(data => {
      if(data) {
        this.loadAvaliacoes();
      }
      else {
        // avaliacao = avaliacaoOri;
        if(novo == false) 
          Object.assign(avaliacao, avaliacaoOri);
      }
    });
    modal.present();
  }

  async excluir(avaliacao: any): Promise<void> {
    this.alertSrv.confirm('Excluir?', `Deseja realmente excluir a sua avaliação?`, async () => {
      let deleteResult = await this.avaliacaoSrv.delete(avaliacao._id);

      if(deleteResult.success) {
        this.alertSrv.toast('Avaliação excluída com sucesso!', 'bottom');
        this.loadAvaliacoes();
      }
    });
  }

}
