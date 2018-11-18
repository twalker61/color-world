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

    if (this.story == "animals") {

      this.images[0]="../assets/imgs/SampleImageCollections/animals/fish.png";
      this.images[1]="../assets/imgs/SampleImageCollections/animals/hippo.png";
      this.images[2]="../assets/imgs/SampleImageCollections/animals/monkey.png";
      this.images[3]="../assets/imgs/SampleImageCollections/animals/snake.png";
      this.images[4]="../assets/imgs/SampleImageCollections/animals/tiger.png";
      this.images[5]="../assets/imgs/SampleImageCollections/animals/turtle.png";
      this.images[6]="../assets/imgs/SampleImageCollections/animals/whale.png";
      this.images[7]="../assets/imgs/SampleImageCollections/animals/zoo.png";
    
    } else if (this.story == "birds") {
      
      this.images[0]="../assets/imgs/SampleImageCollections/birds/angrybirds.png";
      this.images[1]="../assets/imgs/SampleImageCollections/birds/lovebirds.png";
      this.images[2]="../assets/imgs/SampleImageCollections/birds/parrot.png";
      this.images[3]="../assets/imgs/SampleImageCollections/birds/singing.png";
      this.images[4]="../assets/imgs/SampleImageCollections/birds/toucan.png";
      this.images[5]="../assets/imgs/SampleImageCollections/birds/tweety.png";

    } else if (this.story == "disney") {

      this.images[0]="../assets/imgs/SampleImageCollections/disney/ariel.png";
      this.images[1]="../assets/imgs/SampleImageCollections/disney/ducklings.png";
      this.images[2]="../assets/imgs/SampleImageCollections/disney/flounder.png";
      this.images[3]="../assets/imgs/SampleImageCollections/disney/genie.png";
      this.images[4]="../assets/imgs/SampleImageCollections/disney/mylittlepony.png";
      this.images[5]="../assets/imgs/SampleImageCollections/disney/youngdaffy.png";

    } else {

      this.images[0]="../assets/imgs/SampleImageCollections/Pokemon/bulbasaur.png";
      this.images[1]="../assets/imgs/SampleImageCollections/Pokemon/charmander.png";
      this.images[2]="../assets/imgs/SampleImageCollections/Pokemon/pikachu.png";
      this.images[3]="../assets/imgs/SampleImageCollections/Pokemon/snorlax.png";
      this.images[4]="../assets/imgs/SampleImageCollections/Pokemon/starters.png";
      this.images[5]="../assets/imgs/SampleImageCollections/Pokemon/vulpix.png";
    }

    //create grid for ion-grid to display images flexibly
    this.grid = Array(Math.ceil(this.images.length/3));

    var rowNum = 0;
    for (let i = 0; i < this.images.length; i+=3) {
      this.grid[rowNum] = Array(3);
      if (this.images[i]) {
        this.grid[rowNum][0] = this.images[i];
      }
      if (this.images[i+1]) {
        this.grid[rowNum][1] = this.images[i+1];
      }
      if (this.images[i+2]) {
        this.grid[rowNum][2] = this.images[i+2];
      }
      rowNum++;
      
    }


  }

  startColoring(event) {
  let pic = event.srcElement.src;
  	if (this.mode == "opt1") {
  		this.navCtrl.push(ColorPage, {img: pic, mode: this.mode, collection:this.story});
  	} if (this.mode == "opt2") {

  	}
  }

  goToHome() {
    this.navCtrl.push(PickStoryPage);
  }

}