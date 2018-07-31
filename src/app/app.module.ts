import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ReponseService } from './reponse.service';
import { ReponseComponent } from './reponse/reponse.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatInputModule } from '@angular/material';
import {MatIconModule} from '@angular/material';
import { BarRatingModule } from 'ngx-bar-rating';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HomeComponent,
    ReponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    BarRatingModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule
  ],
  providers: [ReponseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
