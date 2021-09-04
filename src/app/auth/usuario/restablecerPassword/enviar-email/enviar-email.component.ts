import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailValuesDTO } from 'src/app/modelo/email-values-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-enviar-email',
  templateUrl: './enviar-email.component.html',
  styleUrls: ['./enviar-email.component.css']
})
export class EnviarEmailComponent implements OnInit {

  mailTo: string='';
  nombreUsuario:string='';
  token:string='';
  // dto: EmailValuesDTO | undefined; 

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toasterService: ToastrService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onEnviarEmail(form: NgForm): void{
    const dto= new EmailValuesDTO(this.mailTo,this.nombreUsuario,this.token); 
    
    this.emailPasswordService.sendEmail(dto).subscribe(
      data =>{
        this.toasterService.success(data.mesaje,'ok',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        
      },
      err =>{

        this.toasterService.error(err.error.mesaje,'Fail',{
          timeOut: 3000, positionClass: 'toast-top-center'
        });

      });
      
    

  }

}
