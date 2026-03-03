import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTooltipModule, MatDatepickerModule, MatSelectModule, HttpClientModule, FormsModule],
  providers: [HttpService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
