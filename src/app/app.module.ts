import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { App } from './app';
import { SafePipe } from './safe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { NotFound } from './not-found/not-found';


@NgModule({
  declarations: [
    App,
    NotFound
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SafePipe,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
