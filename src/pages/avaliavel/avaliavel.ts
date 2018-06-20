import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AvaliavelProvider, Avaliavel } from '../../providers/avaliavel/avaliavel';
import { Classe, ClasseProvider } from '../../providers/classe/classe';

@Component({
  selector: 'page-avaliavel',
  templateUrl: 'avaliavel.html'
})
export class AvaliavelPage {
  avaliavels: any[] = [];
  searchText: string = null;
  classe: Classe;

  constructor(public navCtrl: NavController, private toast: ToastController,
     private avaliavelProvider: AvaliavelProvider, public navParams: NavParams,
     private classeProvider: ClasseProvider) {

      if (this.navParams.data.classe){
        this.classe = this.navParams.data.classe;
      }
    }

  ionViewDidEnter() {
    this.getAllAvaliavels();
  }

  getAllAvaliavels() {
    this.avaliavelProvider.getAll(this.searchText, this.classe)
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

  respostasAvaliavel(avaliavel: Avaliavel) {
    this.avaliavelProvider.update(avaliavel)
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