import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"join-with-angular","appId":"1:896578690049:web:f708bcd0204243c221f400","storageBucket":"join-with-angular.appspot.com","apiKey":"AIzaSyDSQn2ZkZUU30fgAKyYoQOcQls1Dehh2Kc","authDomain":"join-with-angular.firebaseapp.com","messagingSenderId":"896578690049"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
