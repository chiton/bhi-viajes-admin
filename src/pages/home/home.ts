import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Viaje } from '../../models/viaje';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs';
import { DataProvider } from '../../providers/data/data';
import { EditorPage } from '../editor/editor';
import { AuthenticationProvider } from '../../providers/auth/authentication';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private viajes : Observable<any[]>;
  
  constructor(private navCtrl: NavController, 
    private dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    this.viajes =this.dataProvider.getViajes();
  }

  private selectViaje(viaje : Viaje)
  {
    this.navCtrl.push(DetailsPage, {
      viaje: viaje});
  }

  private displayEnCuro(viaje : Viaje) : boolean {
    let currentDate : Date = new Date();
    let departureDate : Date = viaje.departureDate.toDate();
    let returnDate : Date = viaje.returnDate.toDate();
    departureDate.setHours(0, 0);
    returnDate.setHours(23, 59);

    return  (currentDate >= departureDate) &&  (currentDate <= returnDate);
  }

  private addViaje() {
      this.navCtrl.push(EditorPage);
  }
}
