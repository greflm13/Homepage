import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Game2048Component, Save2048Component } from './game2048/game2048.component';
import { HttpgetService } from './httpget.service';
import { HttpputService } from './httpput.service';
import { FieldsizeService } from './fieldsize.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [AppComponent, Game2048Component, Save2048Component],
    bootstrap: [AppComponent], imports: [BrowserModule, FormsModule, NgbModule], providers: [HttpgetService, HttpputService, FieldsizeService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
