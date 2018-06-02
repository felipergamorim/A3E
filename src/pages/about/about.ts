import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public nome1:String="";
  public nome2:String="";

  constructor(public navCtrl: NavController) {

  }
  

}
