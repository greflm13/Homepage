import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from '../chat/chat.component';
import { HomeComponent } from '../home/home.component';
import { MobileComponent } from '../mobile/mobile.component';

const routes: Routes = [
  { path: 'm', component: MobileComponent },
  { path: 'chatWindow', component: ChatComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
