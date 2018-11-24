import { Component, ElementRef, ViewChild} from '@angular/core';

import {Platform} from 'ionic-angular';

//import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { NavController, NavParams, normalizeURL } from 'ionic-angular';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

import {TakePicturePage} from '../take-picture/take-picture'
import {PickPicturePage} from '../pick-picture/pick-picture'
 
 const STORAGE_KEY = 'PICTURE';

@Component({
  selector: 'page-color',
  templateUrl: 'color-page.html'
})

export class ColorPage {
@ViewChild('canvas') canvasEl : ElementRef;
private _CANVAS  : any;
private _CONTEXT  : any;
img = new Image();
 private height : any;
 private width: any;
 private x : any;
 private y : any;
 mode:string="";
 story;
  mainImg:string="../assets/imgs/splash_screen.png";
  color_R;
  color_G;
  color_B;
  constructor(public navCtrl: NavController, public navParams: NavParams, private element: ElementRef, private cameraPreview: CameraPreview, platform: Platform, private file: File, private storage: Storage) {
    this.mainImg = navParams.get("img");
    if (this.mainImg == null) {
      this.storage.ready().then(() => {
        this.storage.get(STORAGE_KEY).then(data => {
          if (data != undefined) {
            this.mainImg = URL.createObjectURL(data);
            this.ionViewDidLoad();
          }
        });
      });
    }
    this.mode = navParams.get("mode");
    this.story = navParams.get("collection");
    //console.log(this.mainImg);
    this.color_R = navParams.get("r");
    this.color_G = navParams.get("g");
    this.color_B = navParams.get("b");
    //console.log("R value: " + this.color_R);

    platform.ready().then((readySource => {
      this.width = platform.width();
      this.height = platform.height();
    }))
    
  }

  ionViewDidLoad() {
     this._CANVAS = this.canvasEl.nativeElement;
     //console.log(this.width);
     this._CANVAS.width = this.width;
     this._CANVAS.height = this.height;
     this.initialiseCanvas();
     this.img.onload = () => {
        //let pixelData = this._CONTEXT.getImageData(this.img.x, this.img.y, this.img.width, this.img.height);
        if (this.img.height > this.img.width) {
          var ratio = this.img.width/this.img.height;
          this.img.height = this.height;
          this.img.width = ratio * this.img.height;
        } else {
          var ratio = this.img.height/this.img.width;
          this.img.width = this.width;
          this.img.height = ratio * this.img.width;
        }
        if (this.img.width > this.width) {
          var ratio = this.img.height/this.img.width;
          this.img.width = this.width;
          this.img.height = ratio * this.img.width;
        } else if (this.img.height > this.height) {
          var ratio = this.img.width/this.img.height;
          this.img.height = this.height;
          this.img.width = ratio * this.img.height;
        }
        console.log("Image height: " + this.img.height);
        this._CONTEXT.drawImage(this.img, 0, 0, this.img.width, this.img.height);
     };
     //this.img.onerror = function() {console.log("Image failed!");};
     //console.log("Main img: " + this.mainImg);
     this.img.src = this.mainImg;
  }
  initialiseCanvas() {
     if(this._CANVAS.getContext)
     {
        this._CONTEXT = this._CANVAS.getContext('2d');
     }
  }

  camera() {
  //app is crashing here when most of image is colored in
  //something wrong in saveCanvasImage flow...
    this.saveCanvasImage();
    this.navCtrl.push(TakePicturePage, {/*img: this.mainImg,*/ mode: this.mode, collection:this.story});
  }

  goBack() {
    //this.saveCanvasImage();
    this.navCtrl.push(PickPicturePage, {mode: this.mode, collection:this.story});
  }

  saveCanvasImage() {
  var dataUrl = this._CANVAS.toDataURL();
  var data = dataUrl.split(',')[1];
  let blob = this.b64toBlob(data, 'image/png');
  this.storeImage(blob);
  
}

b64toBlob(b64Data, contentType) {

  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = atob(b64Data, 'image/png');
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
  //TODO: store by picture name instead of generic storage key
  this.storage.set(STORAGE_KEY, imageBlob);
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
    return (this.getR(color) > 0 && this.getG(color) > 0 && this.getB(color) > 0)
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