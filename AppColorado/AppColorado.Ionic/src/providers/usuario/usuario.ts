import { HttpResultModel } from './../../app/models/httpResultModel';
import { HttpProvider } from './../http/http';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider extends ProviderBase<UsuarioModel> {

  url: string = `${ConfigHelper.Url}usuario`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}usuario`, http);
  }

  public async autenticate(email: string, senha: string): Promise<HttpResultModel> {
    return this.http.post(`${this.url}/autenticar`, { email: email, senha: senha });
  }

  public async register(usuario: UsuarioModel): Promise<HttpResultModel> {
    return this.http.post(`${this.url}/registrar`, usuario);
  }

  public static RegisterLogin(result: any) {
    localStorage.setItem(ConfigHelper.storageKeys.token, result.token);
    localStorage.setItem(ConfigHelper.storageKeys.user, JSON.stringify(result.user));
  }

  public static get GetTokenAccess(): string {
    return localStorage.getItem(ConfigHelper.storageKeys.token);
  }

  public static get IsLogado(): boolean {
    return (localStorage.getItem(ConfigHelper.storageKeys.token) != undefined);
  }

}
