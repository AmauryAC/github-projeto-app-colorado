import { HttpResultModel } from './../../app/models/httpResultModel';
import { HttpProvider } from './../http/http';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { ComercioModel } from '../../app/models/comercioModel';

/*
  Generated class for the ComercioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComercioProvider extends ProviderBase<ComercioModel> {

  url: string = `${ConfigHelper.Url}comercio`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}comercio`, http);
  }

  public async comerciosByCategoria(id: string): Promise<HttpResultModel> {
    return await this.http.get(`${this.url}/categoria/${id}`);
  }

  public async comerciosByUsuario(id: string): Promise<HttpResultModel> {
    return await this.http.get(`${this.url}/usuario/${id}`);
  }

}
