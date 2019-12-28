import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SpinnerProvider } from '../providers/spinner/spinner';
import { AlertProvider } from '../providers/alert/alert';
import { NetworkProvider } from '../providers/network/network';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SpinnerProvider,
    AlertProvider,
    NetworkProvider,
    HttpProvider
  ]
})
export class AppModule {}
