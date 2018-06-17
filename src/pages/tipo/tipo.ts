import { Component } from '@angular/core';
import { NavController,  NavParams,ToastController } from 'ionic-angular';
import { TipoProvider, Tipo } from '../../providers/tipo/tipo';

@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html'
})
export class TipoPage {
  tipos: any[] = [];
  classeText: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast: ToastController, private tipoProvider: TipoProvider) { 
    if (this.navParams.data.classe) {
      this.classeText = this.navParams.data.classe.nome;
    }
  }

  ionViewDidEnter() {
    this.getAllTipos();
  }

  getAllTipos() {
    this.tipoProvider.getAll(this.classeText)
      .then((result: any[]) => {
        this.tipos = result;
      });
  }

  addTipo() {
    this.navCtrl.push('EditTipoPage');
  }

  Teste() {
    this.tipoProvider.getAllClasse(1)
      .then((result: any[]) => {
        this.tipos = result;
      })
      //Teste do filtro de Tipos por classe
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
  perguntasTipo(tipo: Tipo) {
    this.tipoProvider.update(tipo)
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