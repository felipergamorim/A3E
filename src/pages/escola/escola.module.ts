import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolaPage } from './escola';

@NgModule({
  declarations: [
    EscolaPage,
  ],
  imports: [
    IonicPageModule.forChild(EscolaPage),
  ],
})
export class EscolaPageModule {}
