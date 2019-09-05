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
import { DocumentComponent } from './document/document.component';
import { DocumentViewComponent} from './document-view/document-view.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DocumentPendingComponent } from './document-pending/document-pending.component';

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
    DocumentPendingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    QRCodeModule
  ],
  entryComponents: [DialogOnFinalize],
  providers: [AnimationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
