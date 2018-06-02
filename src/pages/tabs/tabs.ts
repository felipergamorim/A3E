import { Component } from '@angular/core';

import { EscolaPage } from '../escola/escola';
import { ClassePage } from '../classe/classe';
import { AboutPage } from '../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EscolaPage;
  tab2Root = ClassePage;
  tab3Root = AboutPage;

  constructor() {

  }
}
