import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { RandomComponent } from './random/random.component';
import { SmallComponent } from './small/small.component';

const routes: Routes = [
  { path: '', component: DashComponent, pathMatch: 'full' },
  { path: 'new', component: NewComponent, pathMatch: 'full' },
  { path: 'random', component: RandomComponent, pathMatch: 'full' },
  { path: 'detail', redirectTo: '', pathMatch: 'full' },
  { path: 'detail/:album', component: DetailComponent, pathMatch: 'full' },
  { path: 'small', redirectTo: '', pathMatch: 'full' },
  { path: 'small/:album', component: SmallComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
