import { AdmAvaliacaoPage } from './../pages/adm-avaliacao/adm-avaliacao';
import { AdmCategoriasItemPage } from './../pages/adm-categorias-item/adm-categorias-item';
import { AdmHorarioFuncionamentoPage } from './../pages/adm-horario-funcionamento/adm-horario-funcionamento';
import { AdmEnderecoPage } from './../pages/adm-endereco/adm-endereco';
import { AdmContatosPage } from './../pages/adm-contatos/adm-contatos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { StarRatingModule } from 'ionic3-star-rating';

import { MyApp } from './app.component';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { AlertProvider } from '../providers/alert/alert';
import { NetworkProvider } from '../providers/network/network';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { CategoriaProvider } from '../providers/categoria/categoria';
import { CameraProvider } from '../providers/camera/camera';
import { ComercioProvider } from '../providers/comercio/comercio';
import { EnderecoProvider } from '../providers/endereco/endereco';
import { ProdutoProvider } from '../providers/produto/produto';
import { ServicoProvider } from '../providers/servico/servico';
import { CategoriaItemProvider } from '../providers/categoria-item/categoria-item';
import { AvaliacaoProvider } from '../providers/avaliacao/avaliacao';

@NgModule({
  declarations: [
    MyApp,
    AdmContatosPage,
    AdmEnderecoPage,
    AdmHorarioFuncionamentoPage,
    AdmCategoriasItemPage,
    AdmAvaliacaoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,
    StarRatingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdmContatosPage,
    AdmEnderecoPage,
    AdmHorarioFuncionamentoPage,
    AdmCategoriasItemPage,
    AdmAvaliacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpinnerProvider,
    AlertProvider,
    NetworkProvider,
    HttpProvider,
    UsuarioProvider,
    CategoriaProvider,
    CameraProvider,
    Camera,
    Network,
    Geolocation,
    CategoriaProvider,
    ComercioProvider,
    EnderecoProvider,
    ProdutoProvider,
    ServicoProvider,
    CategoriaItemProvider,
    AvaliacaoProvider
  ]
})
export class AppModule {}
