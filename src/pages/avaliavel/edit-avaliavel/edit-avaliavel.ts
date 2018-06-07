import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AvaliavelProvider, Avaliavel } from '../../../providers/avaliavel/avaliavel'
import { EscolaProvider } from '../../../providers/escola/escola';
import { ClasseProvider } from '../../../providers/classe/classe';

@IonicPage()
@Component({
  selector: 'page-edit-avaliavel',
  templateUrl: 'edit-avaliavel.html',
})
export class EditAvaliavelPage {
  model: Avaliavel;
  escolas: any[];
  classes: any[];
  tipos: any[];

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private avaliavelProvider: AvaliavelProvider,
    private escolaProvider: EscolaProvider, private classeProvider: ClasseProvider) {

    this.model = new Avaliavel();

    if (this.navParams.data.avaliavel_id) {
      this.avaliavelProvider.get(this.navParams.data.avaliavel_id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }

  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    this.escolaProvider.getAll()
      .then((result: any[]) => {
        this.escolas = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as Escolas.', duration: 3000, position: 'botton' }).present();
      });

      this.classeProvider.getAll()
      .then((result: any[]) => {
        this.classes = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as Classes.', duration: 3000, position: 'botton' }).present();
      });

      /** 
      this.tipoProvider.getAll()
      .then((result: any[]) => {
        this.tipos = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao carregar as Tipos.', duration: 3000, position: 'botton' }).present();
      });
      */
  }

  save() {
    this.saveAvaliavel()
      .then(() => {
        this.toast.create({ message: 'Item Avaliavel salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar a avaliavel.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveAvaliavel() {
    if (this.model.avaliavel_id) {
      return this.avaliavelProvider.update(this.model);
    } else {
      return this.avaliavelProvider.insert(this.model);
    }
  }

}