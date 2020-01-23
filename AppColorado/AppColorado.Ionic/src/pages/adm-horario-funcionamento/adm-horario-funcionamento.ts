import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HorarioFuncModel } from '../../app/models/horarioFuncModel';

/**
 * Generated class for the AdmHorarioFuncionamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm-horario-funcionamento',
  templateUrl: 'adm-horario-funcionamento.html',
})
export class AdmHorarioFuncionamentoPage {

  horarioFunc: Array<HorarioFuncModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.horarioFunc = this.navParams.data;

    if(!this.horarioFunc.length) {
      this.horarioFunc = new Array<HorarioFuncModel>();
    }

    if(this.horarioFunc.length == 0) {
      this.horarioFunc = [
        { diaSemana: 'DOM', horarioAbertura: '', horarioFechamento: '', fechado: true },
        { diaSemana: 'SEG', horarioAbertura: '', horarioFechamento: '', fechado: false },
        { diaSemana: 'TER', horarioAbertura: '', horarioFechamento: '', fechado: false },
        { diaSemana: 'QUA', horarioAbertura: '', horarioFechamento: '', fechado: false },
        { diaSemana: 'QUI', horarioAbertura: '', horarioFechamento: '', fechado: false },
        { diaSemana: 'SEX', horarioAbertura: '', horarioFechamento: '', fechado: false },
        { diaSemana: 'SÁB', horarioAbertura: '', horarioFechamento: '', fechado: true }
      ];
    }

    //console.log(this.horarioFunc);
  }

  salvar(): void {
    if(this.validarCampos()) {
      this.dismiss(this.horarioFunc);
      return;
    }

    this.alertCtrl.create({
      title: 'Erro ao gravar os horários de funcionamento.',
      message: 'Verifique se os dias em que o estabelecimento estará aberto, contém horários de abertura e fechamento preenchidos.',
      buttons: ['OK']
    }).present();
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

  validarCampos(): boolean {
    // this.horarioFunc.forEach(x => {
    //   if(!x.fechado && (x.horarioAbertura == '' || x.horarioFechamento == '')) {
    //     console.log('invalido');
    //     return false;
    //   }
    // });

    for (let i = 0; i < this.horarioFunc.length; i++) {
      if(!this.horarioFunc[i].fechado && (this.horarioFunc[i].horarioAbertura == '' || this.horarioFunc[i].horarioFechamento == '')) {
        return false;
      }
    }

    return true;
  }

  limparHorarioFechado(item: any): void {
    if(item.fechado) {
      item.horarioAbertura = '';
      item.horarioFechamento = '';
    }
  }

}
