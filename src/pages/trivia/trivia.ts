import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Trivia } from '../../models/trivia';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';
import { TriviaResponsesPage } from '../trivia-responses/trivia-responses';

@Component({
  selector: 'page-trivia',
  templateUrl: 'trivia.html',
})
export class TriviaPage {
  private trivia : FormGroup;
  private trivias : Trivia[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fb : FormBuilder,
    private dataProvider : DataProvider) {

      this.trivia = this.fb.group({
        id: [''],
        prize: ['', Validators.required],
        trivia: [ '', Validators.required]
      });
  }

  ionViewDidLoad() {
    this.dataProvider.getTrivias().subscribe(items => { 
      this.trivias = items as Trivia[];
      let triviaToEdit = this.trivias ? this.trivias[0] : undefined;

      if (triviaToEdit)
      {
        this.trivia.setValue({
          id: triviaToEdit.id,
          prize: triviaToEdit.prize,
          trivia: triviaToEdit.trivia
        })
      }
    });
  }

  submit() : any {
    let item : Trivia = this.trivia.value as Trivia;

    if (item.id) { // Editing
      this.dataProvider.updateTrivia(item);
    }
    else { // Adding
        delete item.id; 
        this.dataProvider.addTrivia(item);
      
      }

      this.navCtrl.setRoot(HomePage);
    }

    seeResponses(){
      this.navCtrl.push(TriviaResponsesPage);
    }
}
