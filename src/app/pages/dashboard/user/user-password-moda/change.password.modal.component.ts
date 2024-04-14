import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change.password.modal.component.html',
  styleUrls: ['./change.password.modal.component.css'],
})
export class ChangePasswordModalComponent {
  passwordForm: FormGroup;
  userId: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gService: GenericService,
    private noti: NotificacionService,
    private formBuilder: FormBuilder
    ) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', {
        validators: [Validators.required, Validators.minLength(8), this.validatePasswordStrength],
        updateOn: 'blur'
      }],
      confirmNewPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.userId = this.data.userId;
    console.log('ID de usuario recibido:', this.userId);
  }
  validatePasswordStrength(control: { value: string }): { [key: string]: boolean } | null {
    const password = control.value;
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
    if (password && !strongRegex.test(password)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmNewPassword = formGroup.get('confirmNewPassword')?.value;
    return newPassword === confirmNewPassword ? null : { passwordMismatch: true };
  }

  changePassword() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm)
      this.gService
      .changePass(`user/change`, {id: this.userId, currentPassword: this.passwordForm.value.currentPassword, newPassword: this.passwordForm.value.newPassword })
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        if(response){
          this.noti.mensaje('Actualización', response.message, TipoMessage.success);
        } 
      },(data: any) => {
        this.noti.mensaje('Error', data.error.error, TipoMessage.error);
      }
      );
    } else {
      this.noti.mensaje('Error', 'Formulario inválido', TipoMessage.error);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
