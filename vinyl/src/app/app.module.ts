import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';
import { NewComponent } from './new/new.component';
import { HttpService } from './http.service';
import { DetailComponent } from './detail/detail.component';
import { RandomComponent } from './random/random.component';
import { SafePipe } from './safe.pipe';
import { SmallComponent } from './small/small.component';

@NgModule({ declarations: [AppComponent, DashComponent, NewComponent, DetailComponent, RandomComponent, SafePipe, SmallComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule], providers: [HttpService, HttpClient, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
