import { EnderecoModel } from './../../app/models/enderecoModel';
import { Injectable, NgZone } from '@angular/core';

/*
  Generated class for the EnderecoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var google: any;

@Injectable()
export class EnderecoProvider {

  GoogleAutocomplete: any;
  autocompleteItems: Array<any>;

  endereco: EnderecoModel = new EnderecoModel();

  constructor(public zone: NgZone) {
    this._initAutoComplete();
  }

  private _initAutoComplete(): void {
    try {
      // const loader = new Loader();

      // loader.load().then((google) => {
      //   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      // });

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocompleteItems = [];
    } catch(error) {
      console.log('Erro ao iniciar o autocomplete!', error);
    }   
  }

  public updateSearchResults(autocomplete: any): Promise<Array<any>> {
    this.autocompleteItems = [];

    return new Promise((resolve) => {
      try {
        if (autocomplete.input == '') {
          return this.autocompleteItems;
        }

        this.GoogleAutocomplete.getPlacePredictions({ input: autocomplete.input, componentRestrictions: { country: 'br' }, types: ['address'] },
        (predictions, status) => {
          this.autocompleteItems = [];
          if(status == 'OK') {
            this.zone.run(() => {
              this.autocompleteItems = [];
              predictions.forEach((prediction) => {
                this.autocompleteItems.push(prediction);
              });
            });
          }
          //console.log(this.autocompleteItems);
          resolve(this.autocompleteItems);
        });
      } catch (error) {
        console.log('Erro ao procurar o endereço desejado!');

        this.autocompleteItems = [];
        return this.autocompleteItems;
      }
    }); 
  }

  public selectSearchResult(item: any): EnderecoModel {
    try {
      let tamanho = item.terms.length;

      this.endereco.uf = item.terms[tamanho - 2].value;
      this.endereco.cidade = item.terms[tamanho - 3].value;
      this.endereco.bairro = item.terms[tamanho - 4].value;

      if(tamanho == 5) {
        this.endereco.logradouro = item.terms[tamanho - 5].value;
      }
      else if(tamanho == 6) {
        this.endereco.numero = item.terms[tamanho - 5].value;
        this.endereco.logradouro = item.terms[tamanho - 6].value;
      }

      return this.endereco;
    } catch(error) {
      console.log('Erro ao selecionar o endereço desejado!', error);
      return new EnderecoModel();
    }   
  }

}
