import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { PickPicturePage } from '../pick-picture/pick-picture';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

  chooseMode(event) {
  	let choice = event.srcElement.id;
    this.navCtrl.push(PickPicturePage, {mode: choice});
  }
}
