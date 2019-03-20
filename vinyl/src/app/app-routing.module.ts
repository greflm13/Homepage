import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: DashComponent, pathMatch: 'full' },
  { path: 'new', component: NewComponent, pathMatch: 'full' },
  { path: 'detail', redirectTo: '', pathMatch: 'full' },
  { path: 'detail/:album', component: DetailComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
