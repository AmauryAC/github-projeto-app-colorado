import { UsuarioProvider } from './../usuario/usuario';
import { HttpResultModel } from './../../app/models/httpResultModel';
import { NetworkProvider } from './../network/network';
import { AlertProvider } from './../alert/alert';
import { SpinnerProvider } from './../spinner/spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient, private spinnerSrv: SpinnerProvider, private alertSrv: AlertProvider, private networkSrv: NetworkProvider) {
    
  }

  public createHeader(header?: HttpHeaders): HttpHeaders {
    if(!header) {
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    let token = UsuarioProvider.GetTokenAccess;

    if(token) {
      header = header.append('x-access-token', token);
    }
    
    return header;
  }

  public get(url: string): Promise<HttpResultModel> {
    this.spinnerSrv.show("Carregando os dados...");

    let header = this.createHeader();

    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.get(url, { headers: header })
          .subscribe(_res => {
            this.spinnerSrv.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerSrv.hide();
            this.alertSrv.toast('Não foi possível consultar os dados, verifique sua conexão e tente novamente', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser carregado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public post(url: string, model: any): Promise<HttpResultModel> {
    this.spinnerSrv.show("Salvando informações...");

    let header = this.createHeader();

    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.post(url, model, { headers: header })
          .subscribe(_res => {
            this.spinnerSrv.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerSrv.hide();
            console.log(err);
            if (err.status == 400) {
              let msg = '';
              err.error.validation.forEach(_err => {
                msg += `<li>${_err.message}</li>`;
              });
              this.alertSrv.alert(err.error.message, msg);
            }
            else if (err.status == 404) {
              this.alertSrv.alert('Informação', err.error.message);
            }
            else
              this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public put(url: string, model: any): Promise<HttpResultModel> {
    this.spinnerSrv.show("Atualizando informações...");

    let header = this.createHeader();

    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.put(url, model, { headers: header })
          .subscribe(_res => {
            this.spinnerSrv.hide();
            resolve({ success: true, data: _res, err: undefined });
          }, err => {
            this.spinnerSrv.hide();
            console.log(err);
            if (err.status == 400) {
              let msg = '';
              err.error.validation.forEach(_err => {
                msg += `<li>${_err.message}</li>`;
              });
              this.alertSrv.alert(err.error.message, msg);
            }
            else if (err.status == 404) {
              this.alertSrv.alert('Informação', err.error.message);
            }
            else
              this.alertSrv.toast('Não foi possível realizar o processamento da informação, verifique sua conexão e tente novamente', 'bottom');
            resolve({ success: false, data: undefined, err: err });
          });
      }
      else {
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    });
  }

  public delete(url: string): Promise<HttpResultModel> {
    this.spinnerSrv.show("Removendo registro...");

    let header = this.createHeader();

    return new Promise((resolve) => {
      if (this.networkSrv.IsOnline) {
        this.http.delete(url, { headers: header }).subscribe(_res => {
          this.spinnerSrv.hide();
          resolve({ success: true, data: _res, err: undefined });
        }, err => {
          this.spinnerSrv.hide();
          this.alertSrv.toast('Não foi possível realizar a exclusão do registro!', 'bottom');
          resolve({ success: true, data: undefined, err: err });
        });
      }
      else {
        this.alertSrv.toast('Você está Offline, e infelizmente não pode ser enviado os dados!', 'bottom');
        resolve({ success: true, data: [], err: undefined });
      }
    })
  }

}
