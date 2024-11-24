import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ 
    "projectId": "join-with-angular", 
    "appId": "1:896578690049:web:f708bcd0204243c221f400", 
    "storageBucket": "join-with-angular.firebasestorage.app", 
    "apiKey": "AIzaSyDSQn2ZkZUU30fgAKyYoQOcQls1Dehh2Kc", 
    "authDomain": "join-with-angular.firebaseapp.com",
     "messagingSenderId": "896578690049" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())

  ]

};
