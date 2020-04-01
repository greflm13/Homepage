import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: GameComponent, path: 'game' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
