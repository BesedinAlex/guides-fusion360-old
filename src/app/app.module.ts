import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {ViewGuideComponent} from './components/guide/view-guide/view-guide.component';
import {ModelViewerComponent} from './components/model-viewer/model-viewer.component';
import {CreateGuideComponent} from './components/guide/create-guide/create-guide.component';
import {EditGuideComponent} from './components/guide/edit-guide/edit-guide.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ViewGuideComponent,
    ModelViewerComponent,
    CreateGuideComponent,
    EditGuideComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
