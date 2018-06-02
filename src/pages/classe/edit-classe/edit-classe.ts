import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClasseProvider, Classe } from '../../../providers/classe/classe'

@IonicPage()
@Component({
  selector: 'page-edit-classe',
  templateUrl: 'edit-classe.html',
})
export class EditClassePage {
  model: Classe;
  categories: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private classeProvider: ClasseProvider) {

    this.model = new Classe();

    if (this.navParams.data.classe_id) {
      this.classeProvider.get(this.navParams.data.classe_id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  /**
   * Runs when the page has loaded
   */

  save() {
    this.saveClasse()
      .then(() => {
        this.toast.create({ message: 'Classe salva.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a classe.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveClasse() {
    if (this.model.classe_id) {
      return this.classeProvider.update(this.model);
    } else {
      return this.classeProvider.insert(this.model);
    }
  }

}