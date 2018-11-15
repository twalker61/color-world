import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {ColorPage} from '../color-page/color-page'
import {ListPage} from '../list/list'

@Component({
  selector: 'page-pick-picture',
  templateUrl: 'pick-picture.html'
})

export class PickPicturePage {
  mode: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mode = navParams.get('mode');

  }

  startColoring(event) {
  let pic = event.srcElement.src;
  	if (this.mode == "opt1") {
  		this.navCtrl.push(ColorPage, {img: pic, mode: this.mode});
  	} if (this.mode == "opt2") {

  	}
  }

  goToHome() {
    this.navCtrl.push(ListPage);
  }

}