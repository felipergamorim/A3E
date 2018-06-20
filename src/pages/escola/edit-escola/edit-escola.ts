import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EscolaProvider, Escola } from '../../../providers/escola/escola'

@IonicPage()
@Component({
  selector: 'page-edit-escola',
  templateUrl: 'edit-escola.html',
})
export class EditEscolaPage {
  model: Escola;
  categories: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private escolaProvider: EscolaProvider) {

    this.model = new Escola();

    if (this.navParams.data.escola_id) {
      this.escolaProvider.get(this.navParams.data.escola_id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  /**
   * Runs when the page has loaded
   */

  save() {
    this.saveEscola()
      .then(() => {
        this.toast.create({ message: 'Escola salva.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a escola.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveEscola() {
    if (this.model.escola_id) {
      return this.escolaProvider.update(this.model);
    } else {
      return this.escolaProvider.insert(this.model);
    }
  }

  removeEscola(model: Escola) {
    this.escolaProvider.remove(model.escola_id)
      .then(() => {
        // Removendo a escola
        this.toast.create({ message: 'Escola removida.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
  }

}