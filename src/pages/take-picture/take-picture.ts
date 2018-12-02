import { Component, ElementRef, ViewChild} from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Platform} from 'ionic-angular';

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
	width;
	height;
	platform;
	img:string="";
	mode;
	//story;
	collection;
	imgData;
	colorblot:string="#FFFFFF";
	trackerTask;
	selectedColor:string;
	colortest="start";
	isOn:boolean = false;
	colorSelectionStatus: string = "notSelected";
	findingStatus:string = "";
	imageSource:string = "";
	colors = ['cyan', 'darkgrey', 'pink', 'yellow', 'orange', 'red', 'blue', 'green', 'purple'];
	picture;
	tracker;
	button;
	//pictureCanvas;
	//pictureContext;
	currentColor:string;
	color_R;
	color_G;
	color_B;
	// automaticColorPicker = window.setInterval(() => this.takePicture(), 900);
	cameraPreviewOpts: CameraPreviewOptions = {
	      x: 0,
	      y: 0,
	      width: (window.screen.width),
	      height: (window.screen.height)-200,
	      camera: 'rear',
	      toBack: false,
	      tapPhoto: true,
	      previewDrag: false,
	      alpha: 1
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private platform: Platform) {
		//this.img = navParams.get("img");
		this.mode = navParams.get("mode");
		//this.story = navParams.get("collection");
		this.collection = navParams.get("array");
		this.imgData = navParams.get("imgData");
		this.platform = platform;
		this.loadPlatform();
		
	}

	loadPlatform() {
    this.platform.ready().then((readySource => {
      this.width = this.platform.width() - 60;
      this.height = this.platform.height();
      console.log("Platform ready");
    }))
  }

	startCamera() {
	    this.cameraPreview.startCamera(this.cameraPreviewOpts);
	    this.isOn = true;
	    // this.takePicture();
	}

	selectColor() {
		// this.colorblot = "#FFFFFF";

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
		this.navCtrl.push(ColorPage, {/*img: this.img,*/ r: this.color_R, g: this.color_G, b: this.color_B, mode: this.mode, array:this.collection, imgData:this.imgData /*collection:this.story*/});
	}

	ionViewDidLoad() {
		this.tracker = new tracking.ColorTracker(this.colors);
		this.button = document.getElementById("selectColorButton");
		//this.pictureCanvas = document.getElementById("pictureCanvas");
		//this.pictureContext = this.pictureCanvas.getContext("2d");
		//this.pictureContext.globalAlpha = 0;
	}

	ionViewCanEnter() {
		this.cameraPreview.startCamera(this.cameraPreviewOpts);
		this.isOn = true;
	}

	ionViewDidEnter() {
		this.colortest="start ionviewdidenter method";
	   this._CANVAS = this.canvasEl.nativeElement;
	   this._CANVAS.x = 0;
	   this._CANVAS.y = 0;
	   this._CANVAS.width = (window.screen.width);
	   this._CANVAS.height = (window.screen.height - 200);
	   this.initialiseCanvas();
	   //this.colorCamera();
	   // this.takePicture();
	}

	initialiseCanvas() {
	   if(this._CANVAS.getContext)
	   {
	      this._CONTEXT = this._CANVAS.getContext('2d');
		  //this._CONTEXT.globalAlpha = 0;
	      //this.colortest="canvas initialized";
	   }
	}

	colorCamera() {
	this.colortest="begin colorcamera"
	//console.log(this._CONTEXT);
	this.colortest=this._CONTEXT+"";
	}

	takePicture() {
		// take a picture


		this.findingStatus = "finding";
		this.cameraPreview.takePicture(this.cameraPreviewOpts).then((imageData) => {
		  // making a canvas
		  //
		  this.picture = new Image(this._CANVAS.width, this._CANVAS.height);
		  this.picture.src = 'data:image/jpeg;base64,' + imageData;
		  this.imageSource = this.picture.src;
		  this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
		  // var context = this.pictureCanvas.getContext("2d");
		  this.cameraPreview.hide();
		  //console.log("picture: " + picture.src);
		  //console.log("picture.width: " + picture.width);
		  //console.log("picture.height: " + picture.height);
		  
		  this.picture.onload = () => {
		  	 this._CONTEXT.drawImage(this.picture, this.width*.5*.1, 3, this.picture.width*.9, this.picture.height*.9);
		  	 this._CONTEXT.lineWidth = 7.5;
			  this._CONTEXT.strokeStyle = "#F38630";
			  this._CONTEXT.rect(this.width*.5*.1-3, 0, this.picture.width*.9+6, this.picture.height*.9+6);
			  this._CONTEXT.stroke();
		  }
		}).then(() => {
			this.trackerTask = tracking.trackImg_(this.picture, this.tracker);

		  this.tracker.on('track', (event) => {
		    //this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
		    // console.log(event.data);
		    console.log("Took Picture!");
		    event.data.forEach((rect) => {
		    	// this.colorblot = rect.color;
				// this.button.setAttribute("color", rect.color);
			    // this.colortest= this.colorblot+"";
		    	//this.colortest = rect.color + "";
		        console.log(rect.color);
		 
		      if (rect.width > 110 && rect.height > 110) {
			      this.colorblot = rect.color;
				  this.colortest= this.colorblot+"";
				  this.currentColor = this.colorblot;
				  this.findingStatus = "found";
		      }
		      /*setTimeout(function () {
		            this.trackerTask.stop();
		        }, 10000);*/
		    });

		  });
		  this.colorSelectionStatus = "selected";
		}, (err) => {
		  console.log(err);
		  //this.img = 'assets/img/test.jpg';
		});
		// this.takePicture();
	}

	clearColor() {
		this.colorSelectionStatus = "notSelected";
		this.colorblot = "#FFFFFF";
		this.findingStatus = "";
		this.imageSource = "";
		this.cameraPreview.show();
	}

	ionViewWillLeave() {
		this.stopCamera();
		//this.pictureContext.clearRect(0, 0, this.pictureCanvas.width, this.pictureCanvas.height);
	}

	stopCamera() {
		this.cameraPreview.hide();
		this.cameraPreview.stopCamera();
		//ionApp.style.display = 'block';
	}
}