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

@NgModule({
  declarations: [
    MyApp,
    AdmContatosPage,
    AdmEnderecoPage,
    AdmHorarioFuncionamentoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMaskIonicModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdmContatosPage,
    AdmEnderecoPage,
    AdmHorarioFuncionamentoPage
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
    EnderecoProvider
  ]
})
export class AppModule {}
