import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { StandardsComponent } from './components/standards/standards.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AddStandardComponent } from './components/add-standard/add-standard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { MatRadioModule } from '@angular/material/radio';
import { AddQuestionToQuizComponent } from './components/add-question-to-quiz/add-question-to-quiz.component';
import { QuestionComponent } from './components/question/question.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    DashboardComponent,
    StandardsComponent,
    AddStandardComponent,
    StudentsComponent,
    AddStudentComponent,
    QuizComponent,
    AddQuestionToQuizComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatAutocompleteModule,
    MatChipsModule,
    FormsModule
  ]
})
export class DashboardModule { }
