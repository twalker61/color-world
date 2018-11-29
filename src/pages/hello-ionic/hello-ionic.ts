import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ListPage } from '../list/list';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController, private storage: Storage) {
  	this.storage.clear();
  }

  goToHome() {
  	this.navCtrl.push(ListPage);
  }
}
