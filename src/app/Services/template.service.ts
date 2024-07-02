import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PDF } from '../DTOs/pdfDTO';
import { TemplateDTO } from '../DTOs/templateDTO';
import { Template } from '../Interfaces/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private endpoint:string = environment.endpoint;

  constructor(private http:HttpClient) { }

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${this.endpoint}Template`);
  }
  createTemplate(template:TemplateDTO):Observable<TemplateDTO>{
    return this.http.post<TemplateDTO>(`${this.endpoint}Template`,template)
  }
  createPDF(pdf:PDF):Observable<boolean>{
    return this.http.post<boolean>(`${this.endpoint}Template/CreatePDF`,pdf)
  }
  updateTemplate(template:TemplateDTO):Observable<TemplateDTO>{
    return this.http.put<TemplateDTO>(`${this.endpoint}Template`,template)
  }
  deleteTemplate(id: number): Observable<TemplateDTO> {
    return this.http.delete<TemplateDTO>(`${this.endpoint}Template?id=${id}`);
  }
  checkIfPathExists(pathToCheck: string): Observable<boolean> {
    const url = `${this.endpoint}/check-path-exists?pathToCheck=${encodeURIComponent(pathToCheck)}`;
    return this.http.get<boolean>(url);
  }
}
