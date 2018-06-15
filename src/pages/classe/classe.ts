import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ClasseProvider, Classe } from '../../providers/classe/classe';
import { TipoPage } from '../tipo/tipo';

@Component({
  selector: 'page-classe',
  templateUrl: 'classe.html'
})
export class ClassePage {
  classes: any[] = [];
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private classeProvider: ClasseProvider) { }

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

  filterClasses(ev: any) {
    this.getAllClasses();
  }

}