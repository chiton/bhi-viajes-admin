import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TriviaPage } from '../trivia/trivia';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TriviaPage;
  tab3Root = AboutPage;
  tab4Root = ContactPage;

  constructor() {

  }
  
}
