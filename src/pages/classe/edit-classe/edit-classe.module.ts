import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditClassePage } from './edit-classe';

@NgModule({
  declarations: [
    EditClassePage,
  ],
  imports: [
    IonicPageModule.forChild(EditClassePage),
  ],
})
export class EditClassePageModule {}
