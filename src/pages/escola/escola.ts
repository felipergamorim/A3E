import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { EscolaProvider, Escola } from '../../providers/escola/escola';
import { ClassePage } from '../classe/classe';

@Component({
  selector: 'page-escola',
  templateUrl: 'escola.html'
})
export class EscolaPage {
  escolas: any[] = [];
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private escolaProvider: EscolaProvider) { }

  ionViewDidEnter() {
    this.getAllEscolas();
  }

  getAllEscolas() {
    this.escolaProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.escolas = result;
      });
  }

  addEscola() {
    this.navCtrl.push('EditEscolaPage');
  }

  editEscola(escola_id: number) {
    this.navCtrl.push('EditEscolaPage', { escola_id: escola_id });
  }

  /*removeEscola(escola: Escola) {
    this.escolaProvider.remove(escola.escola_id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.escolas.indexOf(escola);
        this.escolas.splice(index, 1);
        this.toast.create({ message: 'Escola removida.', duration: 3000, position: 'botton' }).present();
      })
  }*/

  pushClasse(escola: Escola) {
    this.navCtrl.push(ClassePage, {escola: escola});
  }
}