import { Component } from '@angular/core';

import { EscolaPage } from '../escola/escola';
import { ClassePage } from '../classe/classe';
import { AvaliavelPage } from '../avaliavel/avaliavel';
import { AboutPage } from '../about/about';
import { TipoPage } from '../tipo/tipo';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  escolaPage = EscolaPage;
  classePage = ClassePage;
  tipoPage = TipoPage;
  avaliavelPage = AvaliavelPage;  
  tab5Root = AboutPage;
  tab6Root = AboutPage;

  constructor() {

  }
}
