import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStandardComponent } from './components/add-standard/add-standard.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { StandardsComponent } from './components/standards/standards.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'standards',
        component: StandardsComponent,
       
      },
      {
        path: 'standards/add',
        component: AddStandardComponent
      },
      {
        path: 'students',
        component: StudentsComponent
      },
      {
        path: 'students/add',
        component: AddStudentComponent
      },
      {
        path: 'quiz',
        component: QuizComponent,
        children: [
          {
            path: ':quizId',
            component: QuestionComponent
          }
        ]
      },
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
