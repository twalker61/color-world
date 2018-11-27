import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ListPage } from '../list/list';

import { PickStoryPage } from '../pick-story/pick-story';

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

  goToGame() {
  	this.navCtrl.push(PickStoryPage, {mode: 'opt1'});
  }
}
