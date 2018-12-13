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
	// platform;
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
    hueHistogram = {
        histogram: [],
        rangeDeltasHue: 0,
        rangeDeltasGrey: 0,
        bucketNum: 0
    };
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
      this.width = this.platform.width();
      this.height = this.platform.height();
      console.log("Platform height" + this.height);
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

		// console.log("current color: " + this.currentColor);
		// if (this.currentColor == this.colors[0]) {
		// 	this.color_R = 0;
		// 	this.color_G = 255;
		// 	this.color_B = 255;
		// } else if (this.currentColor == this.colors[1]) {
		// 	this.color_R =105;
		// 	this.color_G =105;
		// 	this.color_B =105;
		// } else if (this.currentColor == this.colors[2]) {
		// 	this.color_R =255;
		// 	this.color_G =105;
		// 	this.color_B =180;
		// } else if (this.currentColor == this.colors[3]) {
		// 	this.color_R =255;
		// 	this.color_G =255;
		// 	this.color_B =0;
		// } else if (this.currentColor == this.colors[4]) {
		// 	this.color_R =255;
		// 	this.color_G =165;
		// 	this.color_B =0;
		// } else if (this.currentColor == this.colors[5]) {
		// 	this.color_R =255;
		// 	this.color_G =0;
		// 	this.color_B =0;
		// } else if (this.currentColor == this.colors[6]) {
		// 	this.color_R =0;
		// 	this.color_G =0;
		// 	this.color_B =255;
		// } else if (this.currentColor == this.colors[7]) {
		// 	this.color_R =0;
		// 	this.color_G =255;
		// 	this.color_B =0;
		// } else if (this.currentColor == this.colors[8]) {
		// 	this.color_R =148;
		// 	this.color_G =0;
		// 	this.color_B =211;
		// }
        console.log("Done");
		this.navCtrl.push(ColorPage, {r: this.color_R, g: this.color_G, b: this.color_B, mode: this.mode, array:this.collection, imgData:this.imgData});
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

        // change the first value to increase the amount of color buckets
        // change the second value to increase the amount of greyscale buckets
        this.loadHueHistogram(20, 5);
	}

	ionViewDidEnter() {
		this.colortest="start ionviewdidenter method";
	   this._CANVAS = this.canvasEl.nativeElement;
	   this._CANVAS.x = 0;
	   this._CANVAS.y = 0;
	   this._CANVAS.width = (window.screen.width);
	   this._CANVAS.height = (window.screen.height);
	   this.initialiseCanvas();
       this.drawCharacter("searching");
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
		  this.picture = new Image(this._CANVAS.width, this._CANVAS.height - 200);
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
			  //this._CONTEXT.stroke();

            var sampleOptions = {
                x: this.picture.width/3, 
                y: this.picture.height/3,
                width: this.picture.width/3, 
                height: this.picture.height/3,
                skip: 5
            };

            this.colorblot = this.findColor(this._CONTEXT, sampleOptions);
		  }
		  this.currentColor = this.colorblot;
		  this.findingStatus = "found";
		  this.colorSelectionStatus = "selected";

          this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
          this.drawCharacter("found");
		}, (err) => {
		  console.log(err);
		  //this.img = 'assets/img/test.jpg';
		});
		// this.takePicture();
	}

    drawCharacter(status) {
        if (status == "searching") {
            var searchBug = new Image(583, 585);
           searchBug.src = "../assets/imgs/bug_searching.svg";
           searchBug.onload = () => {
            this._CONTEXT.drawImage(searchBug, this.width - 130, this.height-100, 90, 90);
           }
        } else {
            var foundBug = new Image(631, 585);
           foundBug.src = "../assets/imgs/bug_found.svg";
           foundBug.onload = () => {
            this._CONTEXT.drawImage(foundBug, this.width/6, this.height - 100, 96, 90);
           }
        }
    }

	clearColor() {
        this.resetHueHistogram();
		this.colorSelectionStatus = "notSelected";
		this.colorblot = "#FFFFFF";
		this.findingStatus = "";
		this.imageSource = "";
		this.cameraPreview.show();
        this._CONTEXT.clearRect(0,0,this._CANVAS.width, this._CANVAS.height);
        this.drawCharacter("searching");
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

    loadHueHistogram(colorBucketNum, greyBucketNum) {
        // hues
        var range = 360 / colorBucketNum;
        this.hueHistogram.rangeDeltasHue = range;
        this.hueHistogram.bucketNum = colorBucketNum;
        for (var i = 0; i < colorBucketNum; i++) {
            var bucket = {
                start: i * range,
                end: (i + 1) * range,
                count: 0,
                index: i,
                hsv: {
                    h: ((i * range) + ((i + 1) * range)) / 2,
                    s: 1,
                    v: .5
                },
                saturations: [],
                values: []
            };

            this.hueHistogram.histogram.push(bucket);
        }

        // black => greys => white
        var greyRange = 1 / greyBucketNum;
        this.hueHistogram.rangeDeltasGrey = greyRange;
        for (var i = 0; i < greyBucketNum; i++) {
            var bucket = {
                start: i * greyRange,
                end: (i + 1) * greyRange,
                count: 0,
                index: i + Number(colorBucketNum),
                hsv: {
                    h: 0,
                    s: 0,
                    v: ((i * greyRange) + ((i + 1) * greyRange)) / 2
                },
                saturations: [],
                values: []
            };

            this.hueHistogram.histogram.push(bucket);
        }

        console.log("hue histogram length: " + this.hueHistogram.histogram.length);
    }

    resetHueHistogram() {
        for(var i = 0; i < this.hueHistogram.histogram.length; i++) {
            this.hueHistogram.histogram[i].count = 0;
        }
    }

    findColor(context, sampleOptions) {
        var imageData = context.getImageData(sampleOptions.x, sampleOptions.y, sampleOptions.width, sampleOptions.height);
        // console.log("Image data is " + imageData.data.length);

        var pixelArray = imageData.data;

        for(var i = 0; i < pixelArray.length; i += 4) {
            // console.log(pixelArray[i]);
            var rgb = {
                r: pixelArray[i],
                g: pixelArray[i+1],
                b: pixelArray[i+2],
                a: pixelArray[i+3],
            };

            var hsv = this.rgb2hsv(rgb);

            if (hsv.s > 0.4 && hsv.v > 0.15) {
                var index = ~~(hsv.h/this.hueHistogram.rangeDeltasHue);
                // console.log("index: " + index + " hue: " + hsv.h);
                if (index > this.hueHistogram.bucketNum - 1) {
                    index--;
                }
                this.hueHistogram.histogram[index].count++;
                this.hueHistogram.histogram[index].saturations.push(hsv.s);
                this.hueHistogram.histogram[index].values.push(hsv.v);
            } else {
                var index = ~~(hsv.v/this.hueHistogram.rangeDeltasGrey) + this.hueHistogram.bucketNum;
                // console.log('index: ' + index + ' value: ' + hsv.v);
                if (index > this.hueHistogram.histogram.length - 1) {
                    index--;
                }
                this.hueHistogram.histogram[index].count++;
                this.hueHistogram.histogram[index].saturations.push(hsv.s);
                this.hueHistogram.histogram[index].values.push(hsv.v);
            }
        }

        var max = this.findMaxOfHueHistogram();
        // console.log("max: " + max.index);

        var colorResult = this.hsv2rgb(max.hsv);

        this.color_R = colorResult.r;
        this.color_G = colorResult.g;
        this.color_B = colorResult.b;

        return 'rgb( ' + colorResult.r + ', ' + colorResult.g + ', ' + colorResult.b + ')'; 
    }

    findMaxOfHueHistogram() {
        var max = {
            count: 0,
            index: -1,
            hsv: {
                h: 0,
                s: 0,
                v: 0
            },
            saturations: [],
            values: []
        };

        for(var i = 0; i < this.hueHistogram.histogram.length; i++) {
            if (this.hueHistogram.histogram[i].count > max.count) {
                max = this.hueHistogram.histogram[i];
            }
        }

        var sats = this.findAverage(max.saturations);
        var vals = this.findAverage(max.values);
        max.hsv.s = sats;
        max.hsv.v = vals;

        return max;
    }

    findAverage(array) {
        var sum = 0;

        for(var i = 0; i < array.length; i++) {
            sum += array[i];
        }

        return sum / array.length;
    }

    rgb2hsv(rgb) {
        var hsv = {
            h: 0,
            s: 0,
            v: 0
        }

        var _r = rgb.r / 255;
        var _g = rgb.g / 255;
        var _b = rgb.b / 255;

        var cMax = Math.max(_r, _g, _b);
        var cMin = Math.min(_r, _g, _b);
        var delta = cMax - cMin;

        if (delta == 0) {
            hsv.h = 0;
        } else if (cMax == _r) {
            hsv.h = ((_g - _b)/delta) * 60;
        } else if (cMax == _g) {
            hsv.h = (((_b - _r)/delta)+2) * 60;
        } else {
            hsv.h = (((_r - _g)/delta)+4) * 60;
        }

        if (cMax == 0) {
            hsv.s = 0;
        } else {
            hsv.s = delta / cMax;
        }

        hsv.v = cMax;

        if (hsv.h < 0) {
            hsv.h += 360;
        }

        return hsv;
    }

    hsv2rgb(hsv) {
        var rgb = {
            r: 0,
            g: 0,
            b: 0
        };

        var c = hsv.v * hsv.s;
        var x = (1 - Math.abs(((hsv.h/60)%2)-1)) * c;
        var m = hsv.v - c;

        var _r, _g, _b;
        if (0 <= hsv.h && hsv.h < 60) {
            _r = c;
            _g = x;
            _b = 0;
        } else if (60 <= hsv.h && hsv.h < 120) {
            _r = x;
            _g = c;
            _b = 0;
        } else if (120 <= hsv.h && hsv.h < 180) {
            _r = 0;
            _g = c;
            _b = x;
        } else if (180 <= hsv.h && hsv.h < 240) {
            _r = 0;
            _g = x;
            _b = c;
        } else if (240 <= hsv.h && hsv.h < 300) {
            _r = x;
            _g = 0;
            _b = c;
        } else if (300 <= hsv.h && hsv.h < 360) {
            _r = c;
            _g = 0;
            _b = x;
        }

        rgb.r = (_r + m) * 255;
        rgb.g = (_g + m) * 255;
        rgb.b = (_b + m) * 255;

        return rgb;
    }
}