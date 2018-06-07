import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TipoProvider, Tipo } from '../../../providers/tipo/tipo';
import { ClasseProvider } from '../../../providers/classe/classe';

@IonicPage()
@Component({
  selector: 'page-edit-tipo',
  templateUrl: 'edit-tipo.html',
})
export class EditTipoPage {
  model: Tipo;
  classes: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private tipoProvider: TipoProvider,
     private classeProvider: ClasseProvider) {

    this.model = new Tipo();

    if (this.navParams.data.tipo_id) {
      this.tipoProvider.get(this.navParams.data.tipo_id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
      this.classeProvider.getAll()
      .then((result: any[]) => {
        this.classes = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as Classes.', duration: 3000, position: 'botton' }).present();
      });
  }

  save() {
    this.saveTipo()
      .then(() => {
        this.toast.create({ message: 'Tipo salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o tipo.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveTipo() {
    if (this.model.tipo_id) {
      return this.tipoProvider.update(this.model);
    } else {
      return this.tipoProvider.insert(this.model);
    }
  }

}