import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDTO } from 'src/app/Core/dto/change-password-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {

  password: string='';
  confirmPassword: string='';
  tokenPassword: string='';

  dto: ChangePasswordDTO | undefined;

  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  cambiarPassword():void{
    this.tokenPassword = this.activatedRoute.snapshot.params.tokenPassword;
    this.dto = new ChangePasswordDTO(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe(
      data => {
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      },
      err => {
        this.toastrService.error(err.error.mensaje, 'FAIL', {
        timeOut: 3000, positionClass: 'toast-top-center'
        });
      });
    
  }

}
