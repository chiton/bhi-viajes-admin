import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TriviaResponsesPage } from './trivia-responses';

@NgModule({
  declarations: [
    TriviaResponsesPage,
  ],
  imports: [
    IonicPageModule.forChild(TriviaResponsesPage),
  ],
})
export class TriviaResponsesPageModule {}
