import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { DocumentComponent } from './document/document.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { DocumentPendingComponent } from './document-pending/document-pending.component';
import { DocumentReleaseComponent } from './document-release/document-release.component';
import { DocumentTrackComponent } from './document-track/document-track.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, 
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'main', component: MainComponent },
      { path: 'doc', component: DocumentComponent },
      { path: 'doc/:id', component: DocumentViewComponent },
      { path: 'onadd/:id', component: AddDocumentComponent },
      { path: 'pending', component: DocumentPendingComponent },
      { path: 'onrelease/:id', component: DocumentReleaseComponent },
      { path: 'track/:id', component: DocumentTrackComponent },
    ]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
