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
    private dataProvider: DataProvider,
    private authenticationProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    this.viajes =this.dataProvider.getViajes();
    this.loginWithGoogle();
  }

  private selectViaje(viaje : Viaje)
  {
    this.navCtrl.push(DetailsPage, {
      viaje: viaje});
  }

  private addViaje() {
      this.navCtrl.push(EditorPage);
  }

  private loginWithGoogle() {
    this.authenticationProvider.signInWithGoogle();
  }
}
