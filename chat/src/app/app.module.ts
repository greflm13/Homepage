import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeDe from '@angular/common/locales/de-AT';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { ChatComponent } from './chat/chat.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';

import { AutofocusDirective } from './autofocus.directive';
import { FormatStringPipe } from './stringFormatPipe';
import { BeforeLinkPipe } from './before-link.pipe';
import { AfterLinkPipe } from './after-link.pipe';
import { LinkTextPipe } from './link-text.pipe';

registerLocaleData(localeDe, 'de-AT');
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    AutofocusDirective,
    FormatStringPipe,
    BeforeLinkPipe,
    AfterLinkPipe,
    LinkTextPipe
  ],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), HttpClientModule, FormsModule, RoutingModule, PickerModule],
  providers: [HttpClient, HttpService, { provide: LOCALE_ID, useValue: 'de-AT' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
