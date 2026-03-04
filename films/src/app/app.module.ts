import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpService } from './http.service';
import { FolderComponent } from './folder/folder.component';
import { SubFolderComponent } from './sub-folder/sub-folder.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({ declarations: [AppComponent, HomeComponent, FolderComponent, SubFolderComponent, ViewerComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule], providers: [HttpClient, HttpService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
