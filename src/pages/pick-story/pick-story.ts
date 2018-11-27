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


      this.animalStory[0]={id:"fish", src:"../assets/imgs/SampleImageCollections/animals/fish.png"};
      this.animalStory[1]={id:"hipp", src:"../assets/imgs/SampleImageCollections/animals/hippo.png"};
      this.animalStory[2]={id:"monkey", src:"../assets/imgs/SampleImageCollections/animals/monkey.png"};
      this.animalStory[3]={id:"snake", src:"../assets/imgs/SampleImageCollections/animals/snake.png"};
      this.animalStory[4]={id:"tiger", src:"../assets/imgs/SampleImageCollections/animals/tiger.png"};
      this.animalStory[5]={id:"turtle", src:"../assets/imgs/SampleImageCollections/animals/turtle.png"};
      this.animalStory[6]={id:"whale", src:"../assets/imgs/SampleImageCollections/animals/whale.png"};
      this.animalStory[7]={id:"zoo", src:"../assets/imgs/SampleImageCollections/animals/zoo.png"};
    
      
      this.birdStory[0]={id:"angry", src:"../assets/imgs/SampleImageCollections/birds/angrybirds.png"};
      this.birdStory[1]={id:"love", src:"../assets/imgs/SampleImageCollections/birds/lovebirds.png"};
      this.birdStory[2]={id:"parrot", src:"../assets/imgs/SampleImageCollections/birds/parrot.png"};
      this.birdStory[3]={id:"singing", src:"../assets/imgs/SampleImageCollections/birds/singing.png"};
      this.birdStory[4]={id:"toucan", src:"../assets/imgs/SampleImageCollections/birds/toucan.png"};
      this.birdStory[5]={id:"tweety", src:"../assets/imgs/SampleImageCollections/birds/tweety.png"};


      this.disneyStory[0]={id:"ariel", src:"../assets/imgs/SampleImageCollections/disney/ariel.png"};
      this.disneyStory[1]={id:"ducklings", src:"../assets/imgs/SampleImageCollections/disney/ducklings.png"};
      this.disneyStory[2]={id:"flounder", src:"../assets/imgs/SampleImageCollections/disney/flounder.png"};
      this.disneyStory[3]={id:"genie", src:"../assets/imgs/SampleImageCollections/disney/genie.png"};
      this.disneyStory[4]={id:"pony", src:"../assets/imgs/SampleImageCollections/disney/mylittlepony.png"};
      this.disneyStory[5]={id:"daffy", src:"../assets/imgs/SampleImageCollections/disney/youngdaffy.png"};


      this.pokemonStory[0]={id:"bulbasaur", src:"../assets/imgs/SampleImageCollections/Pokemon/bulbasaur.png"};
      this.pokemonStory[1]={id:"charmander", src:"../assets/imgs/SampleImageCollections/Pokemon/charmander.png"};
      this.pokemonStory[2]={id:"pikachu", src:"../assets/imgs/SampleImageCollections/Pokemon/pikachu.png"};
      this.pokemonStory[3]={id:"snorlax", src:"../assets/imgs/SampleImageCollections/Pokemon/snorlax.png"};
      this.pokemonStory[4]={id:"starters", src:"../assets/imgs/SampleImageCollections/Pokemon/starters.png"};
      this.pokemonStory[5]={id:"vulpix", src:"../assets/imgs/SampleImageCollections/Pokemon/vulpix.png"};

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
    this.navCtrl.push(PickPicturePage, {mode: this.mode, collection: col, array: arr});
  }

  goToHome() {
    this.navCtrl.push(ListPage);
  }

}