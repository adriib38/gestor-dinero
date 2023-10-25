import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecordComponent } from './new-record/new-record.component';
import { HomeComponent } from './home/home.component';
import { ListRegistrosComponent } from './list-registros/list-registros.component';

const routes: Routes = [
  { path: '', component: HomeComponent     },
  { path: 'new', component: NewRecordComponent },
  { path: 'registros', component: ListRegistrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
