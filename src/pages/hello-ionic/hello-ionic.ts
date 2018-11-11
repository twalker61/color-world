import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ListPage } from '../list/list';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController) {

  }

  goToHome() {
  	this.navCtrl.push(ListPage);
  }
}
