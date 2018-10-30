import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FolderComponent } from './folder/folder.component';
import { SubFolderComponent } from './sub-folder/sub-folder.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viewer/:path', component: ViewerComponent },
  { path: 'viewer/:path/:subpath', component: ViewerComponent },
  { path: 'viewer/:path/:subpath/:subsubpath', component: ViewerComponent },
  { path: ':folder', component: FolderComponent },
  { path: ':folder/:subfolder', component: SubFolderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
