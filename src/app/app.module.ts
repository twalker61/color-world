import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {PickPicturePage} from '../pages/pick-picture/pick-picture';
import {ColorPage} from '../pages/color-page/color-page'
import {TakePicturePage} from '../pages/take-picture/take-picture'
import {PickStoryPage} from '../pages/pick-story/pick-story'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CameraPreview} from '@ionic-native/camera-preview';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    PickPicturePage,
    ColorPage,
    TakePicturePage,
    PickStoryPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularSvgIconModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    PickPicturePage,
    ColorPage,
    TakePicturePage,
    PickStoryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File
  ]
})
export class AppModule {}
