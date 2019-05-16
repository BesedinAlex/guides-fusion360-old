import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuidesComponent} from './guides/guides.component';

const routes: Routes = [
  {path: '', component: GuidesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
