import { NgModule, ErrorHandler,  LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { EscolaPage } from '../pages/escola/escola';
import { ClassePage } from '../pages/classe/classe';
import { AvaliavelPage } from '../pages/avaliavel/avaliavel';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';

import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { EscolaProvider } from '../providers/escola/escola';
import { ClasseProvider } from '../providers/classe/classe';
import { TipoProvider } from '../providers/tipo/tipo';
import { AvaliavelProvider } from '../providers/avaliavel/avaliavel';

@NgModule({
  declarations: [
    MyApp,
    EscolaPage,
    ClassePage,
    AvaliavelPage,
    AboutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EscolaPage,
    ClassePage,
    AvaliavelPage,
    AboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // Grande sacada para formatar numeros e datas no formato brasileiro
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    EscolaProvider,
    ClasseProvider,
    AvaliavelProvider,
    TipoProvider
  ]
})
export class AppModule {}