import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {GuideComponent} from './components/guide/guide.component';
import {ThreeViewerComponent} from './components/three-viewer/three-viewer.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'guide/:id', component: GuideComponent},
  {path: 'viewer/:id', component: ThreeViewerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
