import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionService, TipoMessage } from 'src/app/share/notificacion.service';
import { FormControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { UserValidators } from 'src/app/services/user.validators ';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from '../user-password-moda/change.password.modal.component';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  [x: string]: any;
  isSuperAdmin: boolean;
  userData: any;
  userForm: FormGroup;
  userFormCreate: FormGroup;
  id: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private cdr: ChangeDetectorRef,
    private gService: GenericService,
    private router: Router,
    private noti: NotificacionService,
    private userService: UserService,
    private userValidators: UserValidators,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { 
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.userData = {
      name: '',
      email: '',
      password: '',
      identification: '',
      phone: '',
      status: false,
    };
    this.userFormCreate = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.userValidators.emailTakenValidator()],
        updateOn: 'blur'
      }],         
      password: ['', [Validators.required, Validators.minLength(8), this.validatePasswordStrength]],
      identification: [''],
      phone: ['']
    });

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      identification: [''],
      phone: [''],
      status: [false],
    });
    this.initData(this.id);
    
    this.isSuperAdmin = this.userService.getInfo().isSuperAdmin;
  }

  initData(id: number){
    if (!isNaN(Number(id))) {
      if(Number(id)){
        this.getUser(Number(id));
      }
    }
  }
  
  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: '400px', // Ancho del modal (ajústalo según tus necesidades)
      data: { userId: this.id }, // Puedes pasar datos al modal si es necesario
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Aquí puedes manejar la lógica después de cerrar el modal, si es necesario
      console.log(`Modal cerrado. Resultado: ${result}`);
    });
  }
  

  ngOnInit(): void {
    this.initData(this.id);
  }

  validatePasswordStrength(control: { value: string }): { [key: string]: boolean } | null {
    const password = control.value;
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
    if (password && !strongRegex.test(password)) {
      return { 'invalidPassword': true };
    }
    return null;
  }
  
  getUser(id: any) {
    this.gService
      .get('user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.setData(data.user);
      });
  }

  updateUser() {
    if (this.userForm.valid) {
      console.log('Formulario válido. Actualizar usuario:', this.userData);
      const id = this.userData.userID
      if(id){
        this.gService
          .update(`user/${id}`, this.userForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.noti.mensaje('Actualización', "Se han relizado los cambios de manera correcta", TipoMessage.success);
            this.setData(data);
        });
      }
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  createUser() {
    if (this.userFormCreate.valid) {
      console.log('Formulario válido. Crear usuario:', this.userFormCreate.value);
      const data = {
        name: this.userFormCreate.value.name,
        email: this.userFormCreate.value.email,
        password: this.userFormCreate.value.password,
        identification: this.userFormCreate.value.identification,
        phone: this.userFormCreate.value.phone,
        status: true,
        role: 2
      }
      this.gService
        .create('user', data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.noti.mensaje('Creación', 'El usuario se creó correctamente', TipoMessage.success);
          this.setData(data);
          this.id = data.userID;
          this.initData(data.userID);
          this.router.navigate(['home/user/form', data.userID]);
          this.cdr.detectChanges();
        });
    } else {
      this.markFormGroupTouched(this.userFormCreate);
    }
  }
  

  setData(user: any){

    this.userData = user;
    this.userForm.patchValue({
      name: this.userData.name || '',
      email: this.userData.email || '',
      password: this.userData.password || '',
      identification: this.userData.identification || '',
      phone: this.userData.phone || '',
      status: this.userData.status || false,
    });
    this.cdr.detectChanges();
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