import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PDF } from 'src/app/DTOs/pdfDTO';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Template } from 'src/app/Interfaces/template';
import { TemplateService } from 'src/app/Services/template.service';

@Component({
  selector: 'app-dialog-html',
  templateUrl: './dialog-html.component.html',
  styleUrls: ['./dialog-html.component.css']
})
export class DialogHTMLComponent implements OnInit {
  formHTML: FormGroup;

  constructor(private dialogRef: MatDialogRef<DialogHTMLComponent>,
    private fbHTML: FormBuilder,
    private snackbar: MatSnackBar,
    private templateService: TemplateService,
    @Inject(MAT_DIALOG_DATA) public dataTemplate: Template) {

      this.formHTML = this.fbHTML.group({
        Recipient: ['', Validators.required],
        DesiredPosition: ['', Validators.required],
        Skills: ['', Validators.required],
        YourName: ['', Validators.required],
        IdTemplate: [this.dataTemplate.id],
        OutputPath: ['', Validators.required],
        RelevantAreas: ['', Validators.required],
      });
      

  }

  ngOnInit(): void {
  }
  alert(message: string, action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  CreatePDF() {
    
    const skillsArray: string[] = this.formHTML.value.Skills.split(',').map((skill: string) => skill.trim());
    
    let outputPath: string = this.formHTML.value.OutputPath;
    outputPath = outputPath.replace(/\//g, '\\\\');
    outputPath += '\\\\output.pdf';

    const model: PDF = {
      Recipient: this.formHTML.value.Recipient,
      DesiredPosition: this.formHTML.value.DesiredPosition,
      Skills: skillsArray,
      YourName: this.formHTML.value.YourName,
      IdTemplate: this.dataTemplate.id,
      OutputPath: outputPath,
      RelevantAreas: this.formHTML.value.RelevantAreas
    };

    this.templateService.createPDF(model).subscribe({
      next: (response: boolean) => {
        this.alert('PDF creado correctamente',"Exito");
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });    
    
  }

}
