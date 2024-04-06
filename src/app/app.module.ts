import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatMomentDateModule} from '@angular/material-moment-adapter'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './Modals/dialog-delete/dialog-delete.component';
import { DialogHTMLComponent } from './Modals/dialog-html/dialog-html.component';



@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogDeleteComponent,
    DialogHTMLComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMomentDateModule,
    MatGridListModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
