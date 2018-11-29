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
  disneyStory=[];
  birdStory=[];
  pokemonStory=[];

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
    
      
      this.birdStory[0]={id:"angry", src:"../assets/imgs/SampleImageCollections/birds/angrybirds.png", width:0, height:0};
      this.birdStory[1]={id:"love", src:"../assets/imgs/SampleImageCollections/birds/lovebirds.png", width:0, height:0};
      this.birdStory[2]={id:"parrot", src:"../assets/imgs/SampleImageCollections/birds/parrot.png", width:0, height:0};
      this.birdStory[3]={id:"singing", src:"../assets/imgs/SampleImageCollections/birds/singing.png", width:0, height:0};
      this.birdStory[4]={id:"toucan", src:"../assets/imgs/SampleImageCollections/birds/toucan.png", width:0, height:0};
      this.birdStory[5]={id:"tweety", src:"../assets/imgs/SampleImageCollections/birds/tweety.png", width:0, height:0};


      this.disneyStory[0]={id:"ariel", src:"../assets/imgs/SampleImageCollections/disney/ariel.png", width:0, height:0};
      this.disneyStory[1]={id:"ducklings", src:"../assets/imgs/SampleImageCollections/disney/ducklings.png", width:0, height:0};
      this.disneyStory[2]={id:"flounder", src:"../assets/imgs/SampleImageCollections/disney/flounder.png", width:0, height:0};
      this.disneyStory[3]={id:"genie", src:"../assets/imgs/SampleImageCollections/disney/genie.png", width:0, height:0};
      this.disneyStory[4]={id:"pony", src:"../assets/imgs/SampleImageCollections/disney/mylittlepony.png", width:0, height:0};
      this.disneyStory[5]={id:"daffy", src:"../assets/imgs/SampleImageCollections/disney/youngdaffy.png", width:0, height:0};


      this.pokemonStory[0]={id:"bulbasaur", src:"../assets/imgs/SampleImageCollections/Pokemon/bulbasaur.png", width:0, height:0};
      this.pokemonStory[1]={id:"charmander", src:"../assets/imgs/SampleImageCollections/Pokemon/charmander.png", width:0, height:0};
      this.pokemonStory[2]={id:"pikachu", src:"../assets/imgs/SampleImageCollections/Pokemon/pikachu.png", width:0, height:0};
      this.pokemonStory[3]={id:"snorlax", src:"../assets/imgs/SampleImageCollections/Pokemon/snorlax.png", width:0, height:0};
      this.pokemonStory[4]={id:"starters", src:"../assets/imgs/SampleImageCollections/Pokemon/starters.png", width:0, height:0};
      this.pokemonStory[5]={id:"vulpix", src:"../assets/imgs/SampleImageCollections/Pokemon/vulpix.png", width:0, height:0};

  }

  goToPictures(event) {
    var col = event.target.id;
    var arr;
    if (col == "animals") {
      arr = this.animalStory;
    } else if (col == "birds") {
      arr = this.birdStory;
    } else if (col == "disney") {
      arr = this.disneyStory;
    } else if (col == "pokemon") {
      arr = this.pokemonStory;
    }
    console.log(arr);
    this.navCtrl.push(PickPicturePage, {mode: this.mode, collection: col, array: arr});
  }

  goToHome() {
    this.navCtrl.push(ListPage);
  }

}