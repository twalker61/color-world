import { Component, ElementRef, ViewChild} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import {ColorPage} from '../color-page/color-page';

import 'tracking';

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
	mode;
	story;
	colorblot:string="#000000";
	trackerTask;
	selectedColor:string;
	colortest="start";
	isOn:boolean = false;
	colors = ['cyan', 'darkgrey', 'pink', 'yellow', 'orange', 'red', 'blue', 'green', 'purple'];
	tracker;
	button;
	pictureCanvas;
	pictureContext;
	currentColor:string;
	color_R;
	color_G;
	color_B;
	automaticColorPicker = window.setInterval(() => this.takePicture(), 900);
	cameraPreviewOpts: CameraPreviewOptions = {
	      x: 10,
	      y: 100,
	      width: (window.screen.width-20),
	      height: window.screen.height/2,
	      camera: 'rear',
	      toBack: false,
	      tapPhoto: true,
	      previewDrag: false,
	      alpha: 1
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {
		this.startCamera();
		this.img = navParams.get("img");
		this.mode = navParams.get("mode");
		this.story = navParams.get("collection");
	}

	startCamera() {
	    this.cameraPreview.startCamera(this.cameraPreviewOpts);
	    this.isOn = true;
	    // this.takePicture();
	}

	selectColor() {
		this.colorblot = "#FFFFFF";

		//this.cameraPreview.stopCamera();
		console.log("current color: " + this.currentColor);
		if (this.currentColor == this.colors[0]) {
			this.color_R = 0;
			this.color_G = 255;
			this.color_B = 255;
		} else if (this.currentColor == this.colors[1]) {
			this.color_R =105;
			this.color_G =105;
			this.color_B =105;
		} else if (this.currentColor == this.colors[2]) {
			this.color_R =255;
			this.color_G =105;
			this.color_B =180;
		} else if (this.currentColor == this.colors[3]) {
			this.color_R =255;
			this.color_G =255;
			this.color_B =0;
		} else if (this.currentColor == this.colors[4]) {
			this.color_R =255;
			this.color_G =165;
			this.color_B =0;
		} else if (this.currentColor == this.colors[5]) {
			this.color_R =255;
			this.color_G =0;
			this.color_B =0;
		} else if (this.currentColor == this.colors[6]) {
			this.color_R =0;
			this.color_G =0;
			this.color_B =255;
		} else if (this.currentColor == this.colors[7]) {
			this.color_R =0;
			this.color_G =255;
			this.color_B =0;
		} else if (this.currentColor == this.colors[8]) {
			this.color_R =148;
			this.color_G =0;
			this.color_B =211;
		}
		this.navCtrl.push(ColorPage, {img: this.img, r: this.color_R, g: this.color_G, b: this.color_B, mode: this.mode, collection:this.story});
	}

	ionViewDidLoad() {
		this.tracker = new tracking.ColorTracker(this.colors);
		this.button = document.getElementById("selectColorButton");
		this.pictureCanvas = document.getElementById("pictureCanvas");
		this.pictureContext = this.pictureCanvas.getContext("2d");
	}

	ionViewDidEnter() {
		this.colortest="start ionviewdidenter method";
	   this._CANVAS = this.canvasEl.nativeElement;
	   this._CANVAS.width = 500;
	   this._CANVAS.height = 500;
	   this.initialiseCanvas();
	   this.colorCamera();
	   // this.takePicture();
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

	  // let tracker = new tracking.ColorTracker(['cyan', 'darkgrey', 'pink', 'yellow', 'orange', 'red', 'blue', 'green', 'purple']);
	  // this.colortest=tracker.colors+"";
	  // console.log(tracker);
	  //camera == true
	  // this.trackerTask = tracking.track('#video', tracker, {
	  //   camera: true
	  // });
	  // this.colortest=" "+this.trackerTask.running_;
	  // console.log(this.trackerTask);


	  // tracker.on('track', (event) => {
	  //   this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
	  //   //this.colortest="inside tracker.on";
	  //   //this.colortest=event.data+"";
	  //   console.log(event.data);
	  //   this.colorblot=event.data[0].color;
	  //   this.colortest=this.colorblot+"";
	  //   event.data.forEach((rect) => {
	  //   	this.colorblot = rect.color;
	  //   	//this.colortest = rect.color + "";
	  //       //console.log(rect.color);
	  //     if (rect.width > 110 && rect.height > 110 && rect.x > (this._CANVAS.width / 3) && rect.x < ((this._CANVAS.width / 3) + 300) && rect.y > (this._CANVAS.height / 3) && rect.y < ((this._CANVAS.height / 3) + 300)) {
	        
	  //         console.log("Hey");
	  //     }
	  //   });

	  // });

	}

	takePicture() {
		// take a picture
		// console.log("Took Picture!");
		this.cameraPreview.takePicture(this.cameraPreviewOpts).then((imageData) => {
		  //this.img = 'data:image/jpeg;base64,' + imageData;
		  // making a canvas
		  var picture = new Image(this._CANVAS.width, this._CANVAS.height);
		  picture.src = 'data:image/jpeg;base64,' + imageData;
		  this.pictureContext.clearRect(0, 0, this.pictureCanvas.width, this.pictureCanvas.height);
		  // var context = this.pictureCanvas.getContext("2d");
		  this.pictureContext.drawImage(picture, 0, 0);
		  this.trackerTask = tracking.trackImg_(picture, this.tracker);

		  this.tracker.on('track', (event) => {
		    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
		    //this.colortest="inside tracker.on";
		    //this.colortest=event.data+"";
		    // console.log(event.data);
		    console.log("Took Picture!");
		    // console.log(this.colorblot);
		    // this.colorblot=event.data[0].color;
		    // this.colortest=this.colorblot+"";
		    event.data.forEach((rect) => {
		    	// this.colorblot = rect.color;
				// this.button.setAttribute("color", rect.color);
			    // this.colortest= this.colorblot+"";
		    	//this.colortest = rect.color + "";
		        console.log(rect.color);
		      // if (rect.width > 110 && rect.height > 110 && rect.x > (this._CANVAS.width / 3) && rect.x < ((this._CANVAS.width / 3) + 300) && rect.y > (this._CANVAS.height / 3) && rect.y < ((this._CANVAS.height / 3) + 300)) {
		      if (rect.width > 110 && rect.height > 110) {
			      this.colorblot = rect.color;
				  this.colortest= this.colorblot+"";
				  this.currentColor = this.colorblot;
				  // console.log(this.colorblot);
		          // console.log("Hey");
		      }
		    });

		  });
		}, (err) => {
		  console.log(err);
		  this.img = 'assets/img/test.jpg';
		});
		// this.takePicture();
	}

	ionViewWillLeave() {
		this.stopCamera();
		this.pictureContext.clearRect(0, 0, this.pictureCanvas.width, this.pictureCanvas.height);
	}

	stopCamera() {
		this.cameraPreview.hide();
		this.cameraPreview.stopCamera();
	}
}