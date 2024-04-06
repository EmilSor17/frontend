import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment'
import { Template } from 'src/app/Interfaces/template';
import { TemplateService } from 'src/app/Services/template.service';
import { TemplateDTO } from 'src/app/DTOs/templateDTO';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM//DD'
  },
  display: {
    dateInput: 'DD/MM/YYYY'
  }
}

@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ]
})
export class DialogAddEditComponent implements OnInit {

  formTemplate: FormGroup;

  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaTemplates: Template[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogAddEditComponent>,
    private fbTemplate: FormBuilder,
    private snackbar: MatSnackBar,
    private templateService: TemplateService,
    @Inject(MAT_DIALOG_DATA) public dataTemplate: Template
  ) {
    this.formTemplate = this.fbTemplate.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      id: [''],
      status: [true]
    });

    this.templateService.getTemplates().subscribe({
      next: (data) => {
        this.listaTemplates = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  alert(message: string, action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  addEditTemplate() {
    const idValue = this.formTemplate.value.id > 0 ? this.formTemplate.value.id : 0;

    const model: TemplateDTO = {
      Id: idValue,
      Name: this.formTemplate.value.name,
      Content: this.formTemplate.value.content,
    };


    if (this.dataTemplate.id == null) {
      this.templateService.createTemplate(model).subscribe({
        next: (data) => {
          this.alert("Template creado", "Listo");
          this.dialogRef.close("create")
        },
        error: (err) => {
          this.alert("No se pudo crear", "Error");
        },
      });
    } else {
      this.templateService.updateTemplate(model).subscribe({
        next: (data) => {
          this.alert("Template Actualizado", "Listo");
          this.dialogRef.close("updated")
        },
        error: (err) => {
          this.alert("No se pudo actualizar", "Error");
        },
      });
    }
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('500px', '350px');
    console.log(this.dataTemplate);
    if (this.dataTemplate) {
      this.formTemplate.patchValue({
        name: this.dataTemplate.name,
        content: this.dataTemplate.content,
        created: this.dataTemplate.created,
        updated: this.dataTemplate.updated,
        id: this.dataTemplate.id
      })
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar"
    }
  }
}
