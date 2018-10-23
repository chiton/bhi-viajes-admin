import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs';

/**
 * Generated class for the TriviaResponsesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trivia-responses',
  templateUrl: 'trivia-responses.html',
})
export class TriviaResponsesPage {
  private respuestas : Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataProvider : DataProvider) {
  }

  ionViewDidLoad() {
    this.respuestas = this.dataProvider.getRespuestas();
  }

}
