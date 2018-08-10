import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { DetailsPage } from '../pages/details/details';
import { EditorPage } from '../pages/editor/editor';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { environment } from '../environments/environment';
import { DataProvider } from '../providers/data/data';
import { MapProvider } from '../providers/map/map';
import { AuthenticationProvider } from '../providers/auth/authentication';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    DetailsPage,
    HomePage,
    TabsPage,
    EditorPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    DetailsPage,
    HomePage,
    TabsPage,
    EditorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    NativeGeocoder, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    MapProvider,
    AngularFireAuth,
    AuthenticationProvider
  ]
})
export class AppModule {}
