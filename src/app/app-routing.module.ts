import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {GuideComponent} from './guide/guide.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'guide/:id', component: GuideComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
