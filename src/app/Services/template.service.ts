import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PDF } from '../DTOs/pdfDTO';
import { TemplateDTO } from '../DTOs/templateDTO';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private endpoint:string = environment.endpoint;

  constructor(private http:HttpClient) { }

  getTemplates():Observable<TemplateDTO>{
    return this.http.get<TemplateDTO>(`${this.endpoint}`)
  }
  createTemplate(template:TemplateDTO):Observable<TemplateDTO>{
    return this.http.post<TemplateDTO>(`${this.endpoint}`,template)
  }
  createPDF(pdf:PDF):Observable<string>{//ToDo
    return this.http.post<string>(`${this.endpoint}/CreatePDF`,pdf)
  }
  updateTemplate(template:TemplateDTO):Observable<TemplateDTO>{
    return this.http.put<TemplateDTO>(`${this.endpoint}`,template)
  }
  deleteTemplate(id:number):Observable<TemplateDTO>{
    return this.http.delete<TemplateDTO>(`${this.endpoint}/${id}`)
  }
}
