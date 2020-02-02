import { AvaliacaoModel } from './../../app/models/avaliacaoModel';
import { HttpResultModel } from './../../app/models/httpResultModel';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { HttpProvider } from './../http/http';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';

/*
  Generated class for the AvaliacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AvaliacaoProvider extends ProviderBase<AvaliacaoModel> {

  url: string = `${ConfigHelper.Url}avaliacao`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}avaliacao`, http);
  }

  public async avaliacoesByComercio(id: string): Promise<HttpResultModel> {
    return await this.http.get(`${this.url}/comercio/${id}`);
  }

}
