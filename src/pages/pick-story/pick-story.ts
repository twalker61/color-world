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
  animalStory=[];
  foodStory=[];
  playStory=[];
  natureStory=[];
  holidayStory=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mode = navParams.get('mode');


      this.animalStory[0]={id:"turtle", src:"../assets/imgs/SampleImageCollections/animals/turtle.png", width:0, height:0};
      this.animalStory[1]={id:"bee", src:"../assets/imgs/SampleImageCollections/animals/bee.png", width:0, height:0};
      this.animalStory[2]={id:"bird", src:"../assets/imgs/SampleImageCollections/animals/bird.png", width:0, height:0};
      this.animalStory[3]={id:"hippo", src:"../assets/imgs/SampleImageCollections/animals/hippo.png", width:0, height:0};
      this.animalStory[4]={id:"horse", src:"../assets/imgs/SampleImageCollections/animals/horse.png", width:0, height:0};
      this.animalStory[5]={id:"monkey", src:"../assets/imgs/SampleImageCollections/animals/monkey.png", width:0, height:0};
      this.animalStory[6]={id:"owl", src:"../assets/imgs/SampleImageCollections/animals/owl.png", width:0, height:0};
      this.animalStory[7]={id:"pig", src:"../assets/imgs/SampleImageCollections/animals/pig.png", width:0, height:0};
      this.animalStory[8]={id:"surfer", src:"../assets/imgs/SampleImageCollections/animals/surfer.png", width:0, height:0};
      //animalCover = this.animalStory[]
    
      
      this.playStory[0]={id:"alien", src:"../assets/imgs/SampleImageCollections/play/alien.png", width:0, height:0};
      this.playStory[1]={id:"castle", src:"../assets/imgs/SampleImageCollections/play/castle.png", width:0, height:0};
      this.playStory[2]={id:"icecream", src:"../assets/imgs/SampleImageCollections/play/ice_cream.png", width:0, height:0};
      this.playStory[3]={id:"robot", src:"../assets/imgs/SampleImageCollections/play/robot.png", width:0, height:0};
      this.playStory[4]={id:"rocket", src:"../assets/imgs/SampleImageCollections/play/rocket.png", width:0, height:0};
      this.playStory[5]={id:"train", src:"../assets/imgs/SampleImageCollections/play/train.png", width:0, height:0};
      this.playStory[6]={id:"wizard", src:"../assets/imgs/SampleImageCollections/play/wizard.png", width:0, height:0};


      this.foodStory[0]={id:"cake", src:"../assets/imgs/SampleImageCollections/food/cake.png", width:0, height:0};
      this.foodStory[1]={id:"gingerbread", src:"../assets/imgs/SampleImageCollections/food/gingerbread_man.png", width:0, height:0};
      this.foodStory[2]={id:"pizza", src:"../assets/imgs/SampleImageCollections/food/pizza.png", width:0, height:0};


      this.natureStory[0]={id:"flower", src:"../assets/imgs/SampleImageCollections/nature/flower.png", width:0, height:0};
      this.natureStory[1]={id:"island", src:"../assets/imgs/SampleImageCollections/nature/island.png", width:0, height:0};

      this.holidayStory[0]={id:"halloween", src:"../assets/imgs/SampleImageCollections/holidays/halloween.png", width:0, height:0};
      this.holidayStory[1]={id:"present", src:"../assets/imgs/SampleImageCollections/holidays/present.png", width:0, height:0};

  }

  goToPictures(event) {
    var col = event.target.id;
    var arr;
    if (col == "animals") {
      arr = this.animalStory;
    } else if (col == "play") {
      arr = this.playStory;
    } else if (col == "food") {
      arr = this.foodStory;
    } else if (col == "nature") {
      arr = this.natureStory;
    } else if (col == "holidays") {
      arr = this.holidayStory;
    }
    console.log(arr);
    this.navCtrl.push(PickPicturePage, {mode: this.mode, collection: col, array: arr});
  }

  goToHome() {
    this.navCtrl.push(ListPage);
  }

}