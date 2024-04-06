import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Template } from './Interfaces/template';
import { TemplateService } from './Services/template.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEditComponent } from './Modals/dialog-add-edit/dialog-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteComponent } from './Modals/dialog-delete/dialog-delete.component';
import { DialogHTMLComponent } from './Modals/dialog-html/dialog-html.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'created', 'updated'];
  dataSource = new MatTableDataSource<Template>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private templateService: TemplateService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar) {
    this.paginator = undefined;
  }
  ngOnInit(): void {
    this.getTemplates()
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openCreate() {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "create")
        this.getTemplates();
    });
  }
  delete(dataTemplate: Template) {
    this.dialog.open(DialogDeleteComponent, {
      disableClose: true,
      data: dataTemplate
    }).afterClosed().subscribe(resultado => {
      if (resultado === "deleted")
        this.templateService.deleteTemplate(dataTemplate.id).subscribe({
      next:(value) => {
        this.alert("El template fue eliminado", "Eliminado");
        this.getTemplates();
      },
    error:(err) =>{
      this.alert("El template no eliminado", "Error");
    },
  })
    });
  }
  alert(message: string, action: string) {
    this.snackbar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }
  openUpdate(dataTemplate: Template) {
    this.dialog.open(DialogAddEditComponent, {
      disableClose: true,
      data: dataTemplate
    }).afterClosed().subscribe(resultado => {
      if (resultado === "updated")
        this.getTemplates();
    });
  }

  openPDF(dataTemplate: Template) {
    this.dialog.open(DialogHTMLComponent, {
      disableClose: true,
      data: dataTemplate,
      width: '500px',
      height: '700px'
    })    
  }
  getTemplates() {
    this.templateService.getTemplates().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}

