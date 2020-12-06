import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

/**
 * Deutsche Lokalisierung für Datumsformatierung, siehe
 * https://devdactic.com/ionic-5-calendar-modal/
 *
 * Siehe auch Provider-Eintrag unten.
 */
registerLocaleData(localeDe);


/**
 * Für Verwendung von HttpClient muss unter `imports` der Eintrag
 * `HttpClientModule` hinzugefügt werden; `HttpClientModule` muss
 * natürlich auch importiert werden.
 */
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "de-DE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
