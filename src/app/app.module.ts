import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './_shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AnimationsService } from './_animations';
import { MainComponent } from './main/main.component';
import { AddDocumentComponent, DialogOnFinalize } from './add-document/add-document.component';
import { DocumentComponent, DialogOnDelete } from './document/document.component';

import { DocumentViewComponent } from './document-view/document-view.component';
import { AuthService } from './_services/index.service';


import { QRCodeModule } from 'angularx-qrcode';
import { DocumentPendingComponent } from './document-pending/document-pending.component';
import { DocumentReleaseComponent } from './document-release/document-release.component';
import { DocumentTrackComponent, DialogOnTrack } from './document-track/document-track.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    AddDocumentComponent,
    DialogOnFinalize,
    DocumentComponent,
    DocumentViewComponent,
    DocumentPendingComponent,
    DocumentReleaseComponent,
    DialogOnDelete,
    DocumentTrackComponent,
    DialogOnTrack
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    QRCodeModule
  ],

 entryComponents: [DialogOnFinalize, DialogOnDelete, DialogOnTrack],
 providers: [AnimationsService, AuthService],
 bootstrap: [AppComponent]
})
export class AppModule { }
