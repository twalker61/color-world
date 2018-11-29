import { Component, ElementRef, ViewChild} from '@angular/core';

import {Platform} from 'ionic-angular';

//import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { NavController, NavParams, normalizeURL } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import {TakePicturePage} from '../take-picture/take-picture'
import {PickPicturePage} from '../pick-picture/pick-picture'
 
 //const STORAGE_KEY = 'PICTURE';

@Component({
  selector: 'page-color',
  templateUrl: 'color-page.html'
})

export class ColorPage {
@ViewChild('canvas') canvasEl : ElementRef;
private _CANVAS  : any;
private _CONTEXT  : any;
img = new Image();
imgData;
platform;
 private height : any;
 private width: any;
 private x : any;
 private y : any;
 mode:string="";
 //story;
 storage : Storage;
 saveKey;
 collection;
  mainImg;
  //:string="../assets/imgs/splash_screen.png"
  color_R;
  color_G;
  color_B;
  constructor(public navCtrl: NavController, public navParams: NavParams, private element: ElementRef, private cameraPreview: CameraPreview, platform: Platform, private file: File, private storage: Storage) {
    //this.mainImg = navParams.get("img");
    this.imgData = navParams.get("imgData");
    console.log("ColorPage imgData: "+this.imgData.width);
    this.saveKey = this.imgData.id;
    console.log("saveKey: "+this.saveKey);
    //console.log("Color Page constructor saveKey: "+this.saveKey);
    this.collection = navParams.get("array");
    this.platform = platform;
    this.storage = storage;
    if (true) {
      this.storage.ready().then(() => {
        this.storage.get(this.saveKey).then(data => {
          //console.log("data: " + data);
          if (data != undefined) {
            this.mainImg = URL.createObjectURL(data);
            console.log("data defined");
          } else {
            console.log("data undefined");
            this.mainImg = navParams.get("img");
            //console.log(navParams.get("img"));
          }
          
        }).then(() => {
        console.log("Load platform");
        this.loadPlatform()
        }).then(() => {
        console.log("Load View");
        this.ionViewDidLoad()
        });
      });
    }
    //console.log("mainImg: "+mainImg);
    //console.log("Reached");
    this.mode = navParams.get("mode");
    //this.story = navParams.get("collection");
    //console.log(this.mainImg);
    this.color_R = navParams.get("r");
    this.color_G = navParams.get("g");
    this.color_B = navParams.get("b");
    //console.log("R value: " + this.color_R);   
  }

  loadPlatform() {
    this.platform.ready().then((readySource => {
      this.width = this.platform.width() - 60;
      this.height = this.platform.height();
      console.log("Platform ready");
    }))
  }

  ionViewDidLoad() {
    if (this.width != undefined && this.height != undefined) {
      console.log(this.canvasEl.nativeElement);
       this._CANVAS = this.canvasEl.nativeElement;
       console.log(this._CANVAS);
       console.log(this.width);
       //console.log(this.width);
       this._CANVAS.width = this.width;
       this._CANVAS.height = this.height;
       this.initialiseCanvas();
       //console.log(this._CANVAS);

       this.img.onload = () => {
          console.log("Width 1: " + this.img.width);
          console.log("Height 1: " + this.img.height);
          //let pixelData = this._CONTEXT.getImageData(this.img.x, this.img.y, this.img.width, this.img.height);
          if (this.imgData.width == 0 && this.imgData.height == 0) {
              var width;
              var height;
              var ratio;
              if (this.img.height > this.img.width) {
                ratio = this.img.width/this.img.height;
                height = this.height;
                width = ratio * height;
                console.log("If one");
              } else {
                ratio = this.img.height/this.img.width;
                width = this.width;
                height = ratio * width;
                console.log("If two");
              }
              console.log("Width 2: " + width);
              console.log("Height 2: " + height);
              if (width > this.width) {
                ratio = height/width;
                width = this.width;
                height = ratio * width;
                console.log("If three");
              } else if (height > this.height) {
                ratio = width/height;
                height = this.height;
                width = ratio * height;
                console.log("If four");
              }
              this.img.height = height;
              this.img.width = width;
              this.imgData.height = height;
              this.imgData.width = width;
          } else {
              this.img.height = this.imgData.height;
              this.img.width = this.imgData.width;
          }
          this._CANVAS.height = this.img.height;
          
          console.log("Width 3: " + this.img.width);
          console.log("Height 3: " + this.img.height);
          //console.log("Image height: " + this.img.height);
          this._CONTEXT.drawImage(this.img, 0, 0, this.img.width, this.img.height);
       };
       //this.img.onerror = function() {console.log("Image failed!");};
       //console.log("Main img: " + this.mainImg);
       this.img.src = this.mainImg;
       this.img.alt = this.saveKey;
       //console.log(this.img.src);
    }
  
    /*platform.ready().then((readySource => {
      this.width = platform.width() - 60;
      this.height = platform.height();
    }));*/
    
  }

  initialiseCanvas() {
     if(this._CANVAS.getContext)
     {
        this._CONTEXT = this._CANVAS.getContext('2d');
     }
  }

  camera() {
    this.saveCanvasImage();
    console.log("ColorPage imgData: "+this.imgData.width);
    //console.log("camera() saveKey: "+this.saveKey);
    this.navCtrl.push(TakePicturePage, {/*img: this.mainImg,*/ mode: this.mode, array:this.collection, imgData: this.imgData /*collection:this.story*/});
  } 

  goBack() {
    this.saveCanvasImage();
    this.navCtrl.push(PickPicturePage, {mode: this.mode, array:this.collection});
  }

  saveCanvasImage() {
  var dataUrl = this._CANVAS.toDataURL();
  var data = dataUrl.split(',')[1];
  let blob = this.b64toBlob(data, 'image/png');
  console.log(blob);
  this.storeImage(blob);
  
}

b64toBlob(b64Data, contentType) {

  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
 
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
 
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
 
    var byteArray = new Uint8Array(byteNumbers);
 
    byteArrays.push(byteArray);
  }
 
  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

storeImage(imageBlob) {
  this.storage.set(this.saveKey, imageBlob);
  this.storage.get(this.saveKey).then(data => {
          //console.log("data: " + data);
          if (data != undefined) {
            console.log("data defined");
          } else {
            console.log("data undefined");
          }
          
        });
}

  getPixel(pixelData, x, y) {
      if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
          return NaN;
      }
      var pixels = pixelData.data;
      var i = (y * pixelData.width + x) * 4;
      return ((pixels[i + 0] & 0xFF) << 24) |
             ((pixels[i + 1] & 0xFF) << 16) |
             ((pixels[i + 2] & 0xFF) <<  8) |
             ((pixels[i + 3] & 0xFF) <<  0);
  }
  convertColor(r,g,b) {
      return ((r & 0xFF) << 24) |
             ((g & 0xFF) << 16) |
             ((b & 0xFF) <<  8) |
             ((255 & 0xFF) <<  0);
  }

  getR(color) {
    return (color >>> 24) & 0xFF;
  }
  getG(color) {
    return (color >>> 16) & 0xFF;
  }
  getB(color) {
    return (color >>>  8) & 0xFF;
  }

  isWhite(color) {
    return (this.getR(color) > 100 && this.getG(color) > 100 && this.getB(color) > 100)
  }

  setPixel(pixelData, x, y, color) {
      var i = (y * pixelData.width + x) * 4;
      var pixels = pixelData.data;
      pixels[i + 0] = (color >>> 24) & 0xFF;
      pixels[i + 1] = (color >>> 16) & 0xFF;
      pixels[i + 2] = (color >>>  8) & 0xFF;
      pixels[i + 3] = (color >>>  0) & 0xFF;
  }

  click(event) {
    if (typeof this.color_R !== 'undefined') {
      this.floodFill(this._CANVAS, event.clientX, event.clientY, this.color_R,this.color_G,this.color_B);
    }
    
  }

  clear() {
    var i;
    for (i = 0; i < this.collection.length; i++) {
      if (this.saveKey == this.collection[i].id) {
        this.mainImg = this.collection[i].src;
        this.loadPlatform();
        this.ionViewDidLoad();
      }
      this.saveCanvasImage();
    }
  }

  floodFill(canvas, x, y, r, g, b) {
      x-= canvas.offsetLeft;
      y-=canvas.offsetTop;
      var current, w, e, stack, color, cx, cy;
      var context = canvas.getContext("2d");
      var pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
      //console.log(this.getPixel(pixelData, x, y));
      var replacementColor = this.convertColor(r,g,b);
      //console.log(replacementColor);
      var firstColor = this.getPixel(pixelData, x, y);
      //console.log(this.getR(firstColor));
      //console.log(this.getG(firstColor));
      //console.log(this.getB(firstColor));
      var done = [];
      for (var i = 0; i < canvas.width; i++) {
          done[i] = [];
      }

      var targetColor = this.getPixel(pixelData, x, y);

      stack = [ [x, y] ];
      //console.log(x)
      done[x][y] = true;
      while ((current = stack.pop())) {
          cx = current[0];
          cy = current[1];
          if (this.isWhite(this.getPixel(pixelData, cx, cy))) {
              this.setPixel(pixelData, cx, cy, replacementColor);

              w = e = cx;
              while (w > 0 && this.isWhite(this.getPixel(pixelData, w - 1, cy))) {
                  --w;
                  if (done[w][cy]) break;
                  this.setPixel(pixelData, w, cy, replacementColor);
              }
              while (e < pixelData.width - 1 && this.isWhite(this.getPixel(pixelData, e + 1, cy))) {
                  ++e;
                  if (done[e][cy]) break;
                  this.setPixel(pixelData, e, cy, replacementColor);
              }

              for (cx = w; cx <= e; cx++) {
                  if (cy > 0) {
                      color = this.getPixel(pixelData, cx, cy - 1);
                      if (this.isWhite(color)) {
                          if (!done[cx][cy - 1]) {
                              stack.push([cx, cy - 1]);
                              done[cx][cy - 1] = true;
                          }
                      }
                  }
                  if (cy < canvas.height - 1) {
                      color = this.getPixel(pixelData, cx, cy + 1);
                      if (this.isWhite(color)) {
                          if (!done[cx][cy + 1]) {
                              stack.push([cx, cy + 1]);
                              done[cx][cy + 1] = true;
                          }
                      }
                  }
              }
          }
      }

      context.putImageData(pixelData, 0, 0, 0, 0, canvas.width, canvas.height);
  }

}