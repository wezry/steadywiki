import { PageComponent } from './components/page/page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageListComponent } from './components/page-list/page-list.component';

const routes: Routes = [
  { path: '', component: PageListComponent},
  { path: ':id', component: PageComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
