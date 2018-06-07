import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AvaliavelProvider, Avaliavel } from '../../providers/avaliavel/avaliavel';

@Component({
  selector: 'page-avaliavel',
  templateUrl: 'avaliavel.html'
})
export class AvaliavelPage {
  avaliavels: any[] = [];
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private avaliavelProvider: AvaliavelProvider) { }

  ionViewDidEnter() {
    this.getAllAvaliavels();
  }

  getAllAvaliavels() {
    this.avaliavelProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.avaliavels = result;
      });
  }

  addAvaliavel() {
    this.navCtrl.push('EditAvaliavelPage');
  }

  editAvaliavel(avaliavel_id: number) {
    this.navCtrl.push('EditAvaliavelPage', { avaliavel_id: avaliavel_id });
  }

  removeAvaliavel(avaliavel: Avaliavel) {
    this.avaliavelProvider.remove(avaliavel.avaliavel_id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.avaliavels.indexOf(avaliavel);
        this.avaliavels.splice(index, 1);
        this.toast.create({ message: 'Avaliavel removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterAvaliavels(ev: any) {
    this.getAllAvaliavels();
  }

}