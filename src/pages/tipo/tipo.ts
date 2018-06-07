import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { TipoProvider, Tipo } from '../../providers/tipo/tipo';

@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html'
})
export class TipoPage {
  tipos: any[] = [];
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private tipoProvider: TipoProvider) { }

  ionViewDidEnter() {
    this.getAllTipos();
  }

  getAllTipos() {
    this.tipoProvider.getAll(this.searchText)
      .then((result: any[]) => {
        this.tipos = result;
      });
  }

  addTipo() {
    this.navCtrl.push('EditTipoPage');
  }

  editTipo(tipo_id: number) {
    this.navCtrl.push('EditTipoPage', { tipo_id: tipo_id });
  }

  removeTipo(tipo: Tipo) {
    this.tipoProvider.remove(tipo.tipo_id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.tipos.indexOf(tipo);
        this.tipos.splice(index, 1);
        this.toast.create({ message: 'Tipo removida.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterTipos(ev: any) {
    this.getAllTipos();
  }

}