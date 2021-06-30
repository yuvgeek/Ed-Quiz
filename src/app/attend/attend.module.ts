import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendRoutingModule } from './attend-routing.module';
import { AttendComponent } from './components/attend/attend.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [AttendComponent],
  imports: [
    CommonModule,
    AttendRoutingModule,
    MatStepperModule,
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
})
export class AttendModule {}
