import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendComponent } from './components/attend/attend.component';

const routes: Routes = [
  {
    path: ':userId/:quizId',
    component: AttendComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendRoutingModule {}
