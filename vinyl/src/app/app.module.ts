import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';
import { NewComponent } from './new/new.component';
import { HttpService } from './http.service';

@NgModule({
  declarations: [AppComponent, DashComponent, NewComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [HttpService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
