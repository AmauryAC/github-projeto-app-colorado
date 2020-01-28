import { HttpResultModel } from './../../app/models/httpResultModel';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { CategoriaItemModel } from './../../app/models/categoriaItemModel';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { HttpProvider } from '../http/http';

/*
  Generated class for the CategoriaItemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriaItemProvider extends ProviderBase<CategoriaItemModel> {

  url: string = `${ConfigHelper.Url}categoria-item`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}categoria-item`, http);
  }

  public async categoriasByComercio(id: string): Promise<HttpResultModel> {
    return await this.http.get(`${this.url}/comercio/${id}`);
  }

}
