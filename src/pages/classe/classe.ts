import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { ClasseProvider, Classe } from '../../providers/classe/classe';
import { TipoPage } from '../tipo/tipo';
import { EscolaProvider, Escola } from '../../providers/escola/escola';
import { AvaliavelPage } from '../avaliavel/avaliavel';

@Component({
  selector: 'page-classe',
  templateUrl: 'classe.html'
})
export class ClassePage {
  classes: any[] = [];
  searchText: string = null;
  escola: Escola;

  constructor(public navCtrl: NavController, private toast: ToastController,
     private classeProvider: ClasseProvider, public navParams: NavParams,
      private escolaProvider: EscolaProvider) { 

      if (this.navParams.data.escola){
        this.escola = this.navParams.data.escola;
      }
     }

  ionViewDidEnter() {
    this.getAllClasses();
  }

  getAllClasses() {
    this.classeProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.classes = result;
      });
  }

  addClasse() {
    this.navCtrl.push('EditClassePage');
  }

  editClasse(classe_id: number) {
    this.navCtrl.push('EditClassePage', { classe_id: classe_id });
  }

  removeClasse(classe: Classe) {
    this.classeProvider.remove(classe.classe_id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.classes.indexOf(classe);
        this.classes.splice(index, 1);
        this.toast.create({ message: 'Classe removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  mostraTipos(classe: Classe) {
    this.navCtrl.push(TipoPage, { classe: classe });
  }

  pushAvaliavel(classe: Classe) {
    this.navCtrl.push(AvaliavelPage, {classe: classe});
  }

  filterClasses(ev: any) {
    this.getAllClasses();
  }

}