import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private noti: NotificacionService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.gService
        .login(`user/login`, this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          if(response && response.token && response.user){
            if(response.user.role == 2){
              this.gService
              .get(`center/user`, response.user.userID)
              .pipe(takeUntil(this.destroy$))
              .subscribe((center: any) => {
                if(center){
                  this.userService.setToken(response.token);
                  this.userService.setUser(response.user, center);
                  this.router.navigate(['home/dashboard']);
                } 
              }
            );
            } else {
              this.userService.setToken(response.token);
              this.userService.setUser(response.user, null);
              this.router.navigate(['home/dashboard']);
            }
          } 
        },(error: any) => {
          this.noti.mensaje('Error de acceso', error, TipoMessage.error);
        }
        );
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
