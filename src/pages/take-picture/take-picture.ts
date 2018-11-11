import { Component, ElementRef, ViewChild} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import {ColorPage} from '../color-page/color-page';

import 'tracking/src/tracking';

declare var tracking: any;

@Component({
  selector: 'take-picture-page',
  templateUrl: 'take-picture.html'
})

export class TakePicturePage {
	  @ViewChild('canvas') canvasEl : ElementRef;
	  @ViewChild('video') video: any;
	  private _CANVAS  : any;
	  private _CONTEXT : any;
	img:string="";
	colorblot:string="#000000";
	trackerTask;
	colortest="start";
	constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {
		this.startCamera();
		this.img = navParams.get("img");
	}

	startCamera() {
		const cameraPreviewOpts: CameraPreviewOptions = {
	      x: 10,
	      y: 100,
	      width: (window.screen.width-20),
	      height: window.screen.height/2,
	      camera: 'rear',
	      toBack: false,
	      tapPhoto: true,
	      previewDrag: false
	    };
	    this.cameraPreview.startCamera(cameraPreviewOpts);
	}

	selectColor() {
		this.colorblot = "#FFFFFF";
		//this.cameraPreview.stopCamera();
		//this.navCtrl.push(ColorPage, {img: this.img});
	}

	ionViewDidLoad() {
		this.colortest="start ionviewdidload method";
	   this._CANVAS = this.canvasEl.nativeElement;
	   this._CANVAS.width = 500;
	   this._CANVAS.height = 500;
	   this.initialiseCanvas();
	   this.colorCamera();
	}

	initialiseCanvas() {
	   if(this._CANVAS.getContext)
	   {
	      this._CONTEXT = this._CANVAS.getContext('2d');
	      this.colortest="canvas initialized";
	   }
	}

	colorCamera() {
	this.colortest="begin colorcamera"
	console.log(this._CONTEXT);
	this.colortest=this._CONTEXT+"";
	  let tracker = new tracking.ColorTracker(['cyan', 'darkgrey', 'pink', 'yellow', 'orange', 'red', 'blue', 'green', 'purple']);
	  this.colortest=tracker.colors+"";
	  console.log(tracker);
	  //camera == true
	  this.trackerTask = tracking.track('#video', tracker, {
	    camera: true
	  });
	  this.colortest=" "+this.trackerTask.running_;
	  console.log(this.trackerTask);


	  tracker.on('track', (event) => {
	    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
	    //this.colortest="inside tracker.on";
	    //this.colortest=event.data+"";
	    console.log(event.data);
	    this.colorblot=event.data[0].color;
	    this.colortest=this.colorblot+"";
	    event.data.forEach((rect) => {
	    	this.colorblot = rect.color;
	    	//this.colortest = rect.color + "";
	        //console.log(rect.color);
	      if (rect.width > 110 && rect.height > 110 && rect.x > (this._CANVAS.width / 3) && rect.x < ((this._CANVAS.width / 3) + 300) && rect.y > (this._CANVAS.height / 3) && rect.y < ((this._CANVAS.height / 3) + 300)) {
	        
	          console.log("Hey");
	      }
	    });

	  });

	}
}