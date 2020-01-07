import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Injectable } from '@angular/core';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(private camera: Camera, private platform: Platform) {
    
  }

  private _getPicture(source: number, callback): void {
    if(this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        try {
          let options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: source,
            //allowEdit: true,
            allowEdit: false,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true
          }

          this.camera.getPicture(options).then((imgData) => {
            let base64Image = `data:image/jpeg;base64,${imgData}`;
            console.log(base64Image);            
            callback(base64Image);
          }, err => {
            console.log('Problema ao capturar a foto!', err);
          });
        } catch (error) {
          console.log('Problema ao tirar a foto!', error);
        }
      });
    }
    else {
      alert('Funcionalidade disponível apenas em um dispositivo móvel!');
    }
  }

  public getPictureFromGalery(callback): void {
    this._getPicture(this.camera.PictureSourceType.PHOTOLIBRARY, callback);
  }

  public takePicture(callback): void {
    this._getPicture(this.camera.PictureSourceType.CAMERA, callback);
  }

}
