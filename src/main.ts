import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/****** Analytics Integration ******/
import * as firebase from "firebase/app";
const config = {
  apiKey: "AIzaSyBo8SwbSKXpZ4ezNOZcp-T4gIsxrxsIxMY",
  authDomain: "covidreliefpakistan-30e89.firebaseapp.com",
  databaseURL: "https://covidreliefpakistan-30e89.firebaseio.com",
  projectId: "covidreliefpakistan-30e89",
  storageBucket: "covidreliefpakistan-30e89.appspot.com",
  messagingSenderId: "1037752441676",
  appId: "1:1037752441676:web:a5e8c2990fac8e2e214de9",
  measurementId: "G-BZKLSDKQXM"
};
firebase.initializeApp(config);
import "firebase/analytics";
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
