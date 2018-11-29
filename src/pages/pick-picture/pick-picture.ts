import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {ColorPage} from '../color-page/color-page'
import {PickStoryPage} from '../pick-story/pick-story'

@Component({
  selector: 'page-pick-picture',
  templateUrl: 'pick-picture.html'
})

export class PickPicturePage {
  mode: string = "";
  story;
  images=[];
  grid:Array<Array<string>>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mode = navParams.get('mode');
    this.story =navParams.get('collection');
    this.images = navParams.get('array');

    //create grid for ion-grid to display images flexibly
    this.grid = Array(Math.ceil(this.images.length/3));

    var rowNum = 0;
    for (let i = 0; i < this.images.length; i+=3) {
      this.grid[rowNum] = Array(3);
      if (this.images[i]) {
        this.grid[rowNum][0] = this.images[i].src;
      } else {
        this.grid[rowNum][0] = "";
      }
      if (this.images[i+1]) {
        this.grid[rowNum][1] = this.images[i+1].src;
      } else {
        this.grid[rowNum][1] = "";
      }
      if (this.images[i+2]) {
        this.grid[rowNum][2] = this.images[i+2].src;
      } else {
        this.grid[rowNum][2] = "";
      }
      rowNum++;
      
    }


  }

  startColoring(event) {
  let transferImg = event.srcElement.src;
  //console.log(transferImg);
  let pic = "../"+event.srcElement.src.replace(event.srcElement.baseURI, "");
  //console.log(event);
  var i;
  var id;
  //console.log("pic: "+pic);
  for (i = 0; i < this.images.length; i++) {
    //console.log("this.images[i].src: "+this.images[i].src);
    //console.log();
    if (this.images[i].src == pic) {
      //console.log("Index found: "+i);
      id = i;
    }
  }
  //console.log("Pick Picture id: "+id);
  	/*if (this.mode == "opt1") {
  		
  	} if (this.mode == "opt2") {

  	}*/
    console.log(id);
    this.navCtrl.push(ColorPage, {img: pic, mode: this.mode, collection:this.story, array: this.images, imgData: this.images[id]});
  }

  goToHome() {
    this.navCtrl.push(PickStoryPage, {mode: this.mode})
  }

}