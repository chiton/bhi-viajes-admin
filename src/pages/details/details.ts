import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Viaje } from '../../models/viaje';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';
import { MapProvider } from '../../providers/map/map';
import { DataProvider } from '../../providers/data/data';
import { EditorPage } from '../editor/editor';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  
  private viaje : Viaje;

  constructor(public navCtrl: NavController, 
    private navParams: NavParams,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private mapProvider: MapProvider,
    private dataProvider: DataProvider,
    private alertCtl: AlertController) {
    this.viaje = this.navParams.get('viaje');
  }

  ionViewDidLoad() {
    this.mapProvider.loadMap(this.viaje.coord.latitude, this.viaje.coord.longitude);

    // Get coord details street etc, test in device
    this.nativeGeocoder.reverseGeocode(this.viaje.coord.latitude, this.viaje.coord.longitude)
      .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      .catch((error: any) => console.log(error));
  }

  getPosition(): any {
    this.geolocation.getCurrentPosition()
    .then((response) => {
      this.mapProvider.loadMap(response.coords.latitude, response.coords.longitude);
    })
    .catch((error) =>{
      console.log(error);
    })}

  informCoord(viaje : Viaje) : any {
    this.geolocation.getCurrentPosition()
    .then((response) => {
        this.viaje.coord = new firebase.firestore.GeoPoint(response.coords.latitude, response.coords.longitude);
        this.viaje.lastEntry = firebase.firestore.Timestamp.fromDate(new Date());
        
        this.dataProvider.updateViaje(this.viaje);
        this.mapProvider.loadMap(this.viaje.coord.latitude, this.viaje.coord.longitude);
      })
    .catch((error) =>{
        console.log(error);
      })
    }

    removeViaje(viaje : Viaje)
    {
      this.showConfirmationMessage(viaje);
    }

    editViaje(viaje : Viaje) {
      this.navCtrl.pop();
      this.navCtrl.push(EditorPage, {
        viaje: viaje});
    }
  

    showConfirmationMessage(viaje : Viaje) {
      let alert = this.alertCtl.create({
        title: 'Confirmar eliminación',
        message: 'Estás seguro que querés eliminarlo?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.dataProvider.removeViaje(viaje);
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
}
