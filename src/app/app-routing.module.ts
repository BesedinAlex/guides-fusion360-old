import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ViewGuideComponent} from './components/guide/view-guide/view-guide.component';
import {ModelViewerComponent} from './components/model-viewer/model-viewer.component';
import {CreateGuideComponent} from './components/guide/create-guide/create-guide.component';
import {EditGuideComponent} from './components/guide/edit-guide/edit-guide.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'guide/:id', component: ViewGuideComponent},
  {path: 'viewer/:id', component: ModelViewerComponent},
  {path: 'guide-new', component: CreateGuideComponent},
  {path: 'guide-edit/:id', component: EditGuideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
