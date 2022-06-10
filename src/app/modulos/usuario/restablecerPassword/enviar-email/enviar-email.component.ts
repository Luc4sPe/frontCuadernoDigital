import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailValuesDTO } from 'src/app/Core/dto/email-values-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.css']
})
export class EnviarEmailComponent implements OnInit {

  mailTo: string='';
  
   dto: EmailValuesDTO | undefined; 

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toasterService: ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  enviarEmail(): void{
    //const dto= new EmailValuesDTO(this.mailTo); 
    this.dto = new EmailValuesDTO(this.mailTo);
    //alert(this.dto.mailTo);
    this.emailPasswordService.sendEmail(this.dto).subscribe(
      data =>{
       
        
        this.toasterService.success(data.mensaje,'ok',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
      },
      err =>{
        this.toasterService.error(err.error.mensaje,'Fail este es el error',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });

      });
      
    

  }

}
