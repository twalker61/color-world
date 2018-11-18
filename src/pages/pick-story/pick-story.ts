import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {PickPicturePage} from '../pick-picture/pick-picture'
import {ListPage} from '../list/list'

@Component({
  selector: 'page-pick-story',
  templateUrl: 'pick-story.html'
})

export class PickStoryPage {
  mode: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mode = navParams.get('mode');

  }

  goToPictures(event) {
    this.navCtrl.push(PickPicturePage, {mode: this.mode, collection:event.target.id})
  }

  goToHome() {
    this.navCtrl.push(ListPage);
  }

}