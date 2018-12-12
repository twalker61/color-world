import { Component, ElementRef, ViewChild} from '@angular/core';

import {Platform} from 'ionic-angular';

//import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { NavController, NavParams, normalizeURL } from 'ionic-angular';

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
hiddenCanvas;
img = new Image();
imgData;
platform;
 private height : any;
 private width: any;
 private x : any;
 private y : any;
 mode:string="";
 //story;
 //storage : Storage;
 saveKey;
 collection;
  mainImg;
  //:string="../assets/imgs/splash_screen.png"
  color_R;
  color_G;
  color_B;
  borderWidth = 5;
  borderOffset = 3;
  textStatus;
  constructor(public navCtrl: NavController, public navParams: NavParams, private element: ElementRef, platform: Platform, private file: File, private storage: Storage) {
    this.textStatus= 'hidden';
    //this.mainImg = navParams.get("img");
    this.imgData = navParams.get("imgData");
    console.log("ColorPage imgData: "+this.imgData.width);
    this.saveKey = this.imgData.id;
    console.log("saveKey: "+this.saveKey);
    //console.log("Color Page constructor saveKey: "+this.saveKey);
    this.collection = navParams.get("array");
    this.platform = platform;
    //this.storage = storage;
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

  getPixel(pixels, x, y, pixelWidth, pixelHeight) {
      if (x < 0 || y < 0 || x >= pixelWidth || y >= pixelHeight) {
          // console.log("nothing at ( " + x + ", " + y + ")");
          return NaN;
      }
      var i = (y * pixelWidth + x) * 4;

      var rgb = {r: pixels[i + 0],
              g: pixels[i + 1],
              b: pixels[i + 2]};
      return rgb;
  }

  isWhite(color) {
    return (color.r > 100 && color.g > 100 && color.b > 100);
  }

  isBlack(color) {
    return(color.r < 50 && color.g < 50 && color.b < 50);
  }

  setPixel(pixels, x, y, color, pixelWidth) {
      var i = (y * pixelWidth + x) * 4;
      pixels[i + 0] = color.r;
      pixels[i + 1] = color.g;
      pixels[i + 2] = color.b;
  }

  isColorSame(color1, color2) {
    return (color1.r == color2.r && color1.g == color2.g && color1.b == color2.b);
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

  toggleSpeechBubble() {
    if (this.textStatus=='showing') {
      this.textStatus='hidden';
    } else {
      this.textStatus='showing';
    }
  }

  floodFill(canvas, x, y, r, g, b) {
    var start = performance.now();
      x-= canvas.offsetLeft;
      y-=canvas.offsetTop;
      var current, left, right, stack, color, cx, cy;
      var context = canvas.getContext("2d");
      var pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
      var pixelArray = pixelData.data;
      var pixelWidth = pixelData.width;
      var pixelHeight = pixelData.height;

      var replacementColor = {r: Math.round(r),
                              g: Math.round(g),
                              b: Math.round(b)};
      var oldColor = this.getPixel(pixelArray, x, y, pixelWidth, pixelHeight);

      if (this.isBlack(oldColor) || this.isColorSame(replacementColor, oldColor)) {
        return;
      }
      var done = [];
      for (var i = 0; i < canvas.width; i++) {
          done[i] = [];
      }

      stack = [ [x, y] ];
      done[x][y] = true;
      while ((current = stack.pop())) {
          cx = current[0];
          cy = current[1];
          
          if (!this.isBlack(this.getPixel(pixelArray, cx, cy, pixelWidth, pixelHeight))) {
              this.setPixel(pixelArray, cx, cy, replacementColor, pixelWidth);

              left = right = cx;

              while (left > 0 && !this.isBlack(this.getPixel(pixelArray, left - 1, cy, pixelWidth, pixelHeight))) {
                  --left;
                  if (done[left][cy]) {
                    break;
                  }
                  this.setPixel(pixelArray, left, cy, replacementColor, pixelWidth);
                  done[left][cy] = true;
              }

              while (right < pixelWidth - 1 && !this.isBlack(this.getPixel(pixelArray, right + 1, cy, pixelWidth, pixelHeight))) {
                  ++right;
                  if (done[right][cy]) {
                    break;
                  }
                  this.setPixel(pixelArray, right, cy, replacementColor, pixelWidth);
                  done[right][cy] = true;
              }

              for (cx = left; cx <= right; cx++) {
                  if (cy > 0) {
                      if (!done[cx][cy - 1]) {
                          stack.push([cx, cy - 1]);
                          done[cx][cy - 1] = true;
                      }
                  }
                  if (cy < pixelHeight - 1) {
                      if (!done[cx][cy + 1]) {
                          stack.push([cx, cy + 1]);
                          done[cx][cy + 1] = true;
                      }
                  }
              }
          }
      }

      context.putImageData(pixelData, 0, 0, 0, 0, canvas.width, canvas.height);
      var end = performance.now();
      console.log("Action took " + (end - start) + " ms long!");
  }

}