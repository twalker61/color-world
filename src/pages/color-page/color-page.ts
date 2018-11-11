import { Component, ElementRef, Renderer2 } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import {TakePicturePage} from '../take-picture/take-picture'
import {PickPicturePage} from '../pick-picture/pick-picture'
 

@Component({
  selector: 'page-color',
  templateUrl: 'color-page.html'
})

export class ColorPage {
	img = "";
	mainImg:string="../assets/imgs/splash_screen.png"
  constructor(public navCtrl: NavController, public navParams: NavParams, private element: ElementRef, private renderer: Renderer2, private cameraPreview: CameraPreview) {
  	this.mainImg = navParams.get("img");
  	console.log(this.mainImg);
  	/*if (this.img == "img1") {
  		this.mainImg = "../assets/imgs/IMG_1.svg"
  	} else if (this.img == "img2") {
  		this.mainImg = "../assets/imgs/IMG_2.svg"
  	} else if (this.img == "img3") {
  		this.mainImg = "../assets/imgs/IMG_3.svg"
  	} else if (this.img == "img4") {
  		this.mainImg = "../assets/imgs/IMG_10.svg"
  	} else if (this.img == "img5") {
  		this.mainImg = "../assets/imgs/IMG_11.svg"
  	} else if (this.img == "img6") {
  		this.mainImg = "../assets/imgs/SampleImg.svg"
  	} else if (this.img == "img7") {
  		this.mainImg = "../assets/imgs/Scenery_1.svg"
  	} else if (this.img == "img8") {
  		this.mainImg = "../assets/imgs/IMG_New.svg"
  	} else if (this.img == "img9") {
  		this.mainImg = "../assets/imgs/noun_parsley_2003024.svg"
  	}*/ 

  	
  	
  }

  camera() {
    this.navCtrl.push(TakePicturePage, {img: this.mainImg});
  }

  goBack() {
    this.navCtrl.push(PickPicturePage);
  }

  /*ngAfterViewInit() {
  let a = document.getElementById("picture");

            // It's important to add an load event listener to the object,
            // as it will load the svg doc asynchronously
            a.addEventListener("load",function(){

                // get the inner DOM of alpha.svg
                let svgDoc = (<HTMLIFrameElement>a).contentDocument;
                // get the inner element by id
                let delta = svgDoc.getElementById("Oval-6-Copy-2");
                // add behaviour
                delta.addEventListener("mousedown",function(){
                        alert('hello world!')
                }, false);
            }, false);
  }*/



  /*ngAfterViewInit() {
  	this.renderer.listen(this.element.nativeElement, 'click', () => {
  		console.log(this.element);
  		this.renderer.setStyle(this.element.nativeElement.children[1].img, 'fill', 'red');
  	})
  	let svg = document.getElementById("picture");
  console.log(svg.firstElementChild);
  	//let svgDom = svg.contentDocument;
  		//console.log(svgDom);
  	svg.addEventListener("load", function() {
  		let svgDom = (<HTMLIFrameElement>svg).contentDocument;
  		console.log(svgDom);
  		let pieces = svg.querySelectorAll(".img-piece");
  		console.log(pieces);
  		for (let i = 0; i < pieces.length; i++) {
  			pieces[i].addEventListener('click', function() {
  				console.log("clicked");
  			});
  		}
  	})
  }*/

}