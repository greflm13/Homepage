import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from '../chat/chat.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [{ path: 'chatWindow', component: ChatComponent }, { path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
