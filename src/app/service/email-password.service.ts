import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordDTO } from '../dto/change-password-dto';
import { EmailValuesDTO } from '../dto/email-values-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  changePasswordURL = environment.changePasswordURL;
  //changePasswordURL = 'http://localhost:8080/email-password';
  
  constructor( private httpCliente: HttpClient) { }


  public sendEmail(dto: EmailValuesDTO): Observable<any> {
    return this.httpCliente.post<any>(this.changePasswordURL + '/send-email', dto);
  }

  public changePassword(dto: ChangePasswordDTO): Observable<any> {
    return this.httpCliente.post<any>(this.changePasswordURL + '/change-Password', dto);
  }
}

