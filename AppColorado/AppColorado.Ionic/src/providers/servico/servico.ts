import { HttpResultModel } from './../../app/models/httpResultModel';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { HttpProvider } from './../http/http';
import { ServicoModel } from './../../app/models/servicoModel';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';

/*
  Generated class for the ServicoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicoProvider extends ProviderBase<ServicoModel> {

  url: string = `${ConfigHelper.Url}servico`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}servico`, http);
  }

  public async servicosByCategoria(id: string): Promise<HttpResultModel> {
    return await this.http.get(`${this.url}/categoria/${id}`);
  }

  public async servicosByComercio(id: string): Promise<HttpResultModel> {
    return await this.http.get(`${this.url}/comercio/${id}`);
  }

}
