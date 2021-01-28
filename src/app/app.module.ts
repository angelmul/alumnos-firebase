import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { ApiServiceProvider } from '../providers/api-service/api-service';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

//import { IonicStorageModule } from '@ionic/storage';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';





@NgModule({

  declarations: [AppComponent],

  entryComponents: [],

  imports: [BrowserModule, IonicModule.forRoot(), 

    //IonicStorageModule.forRoot(), 

    AppRoutingModule, 

    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFirestoreModule],

  providers: [

    StatusBar,

    SplashScreen,

    ApiServiceProvider,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],

  bootstrap: [AppComponent]

})

export class AppModule {}