import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { ImageUploadService } from '../../../../../../service/image-upload.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UtilsValidators } from 'src/app/services/utils.validators';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css'],
})
export class MaterialFormComponent {
  id: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Nuevo Material';
  base64String: string = '';
  file: File = new File([], '');

  errImg: boolean = false;
  materialForm!: FormGroup;
  materialData: any;
  isSuperAdmin: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private userService: UserService,
    private noti: NotificacionService,
    private route: ActivatedRoute,
    private vaidator: UtilsValidators
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.isSuperAdmin = this.userService.getInfo().isSuperAdmin;
    this.formularioReactive();
    this.initData(this.id);
  }

  initData(id: number) {
    if (!isNaN(Number(id))) {
      if (Number(id)) {
        this.getMaterialId(Number(id));
      }
    }
  }
  
  getMaterialId(id: any) {
    this.gService
      .get('material', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.setData(data);
      });
  }  
  
  setData(coupon: any){
    this.materialData = coupon;
    this.materialForm.patchValue({
      name: this.materialData.name || '',
      description: this.materialData.description || '',
      unit_of_measure: this.materialData.unit_of_measure || '',
      color_representation: this.materialData.color_representation || '',
      price: this.materialData.price || 0,
    });
    // Crear un archivo File
    this.file = this.getBase64ToFile(this.materialData.base64Image);
    this.cdr.detectChanges();
  }

  getBase64ToFile(base64Image: string){
    if(base64Image){
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const uniqueFileName = `file_${Date.now()}.png`;
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
  
      return new File([blob], uniqueFileName, { type: 'image/png' }); // Ajusta el tipo de archivo según corresponda (p. ej. 'image/png' o 'image/jpeg')
  
    } 
    return new File([], '');;
  }

  formularioReactive() {
    this.materialForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(150),
        ]),
      ],
      unit_of_measure: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      price: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/), // Acepta números con hasta dos decimales
          Validators.min(0), // Asegura que el valor sea positivo o cero
        ]),
      ],
      color_representation: [null, {
        validators: [Validators.required],
        asyncValidators: [this.vaidator.colorTakenValidator()],
        updateOn: 'blur' // Opcional: valida cuando el campo pierde el foco
      }],
    });
  }

  submitMaterial(): void {
    if (this.materialForm.invalid || !this.file.name) {
      this.markFormGroupTouched(this.materialForm);
      if (!this.file.name) this.errImg = true
      return;
    }
    const form = this.materialForm.value;
    this.errImg = false
    const fileReader = new FileReader();
    const gService = this.gService;
    const destroy$ = this.destroy$;
    const noti = this.noti;
    const router = this.router;
    const id = this.id;


    fileReader.onload = function (event: any) {
      if (event.target && event.target.result) {
        const base64String = event.target.result.split(',')[1];

        var body = {
          name: form.name,
          description: form.description,
          unit_of_measure: form.unit_of_measure,
          price: form.price,
          color_representation: form.color_representation,
          image: base64String
        }


        if (!id) {
          gService
            .create('material', body)
            .pipe(takeUntil(destroy$))
            .subscribe((data: any) => {
              noti.mensajeRedirect(
                'Registrado',
                `Material: ${data.name} creado correctamente`,
                TipoMessage.success,
                'home/material'
              );
            });
        } else {
          gService
            .update(`material/${id}`, body)
            .pipe(takeUntil(destroy$))
            .subscribe((data: any) => {
              noti.mensajeRedirect(
                'Actualizado',
                `Material: ${data.name} actualizado correctamente`,
                TipoMessage.success,
                'home/material'
              );
            });
        }
      }
    };

    fileReader.readAsDataURL(this.file);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onReset() {
    this.materialForm.reset();
    this.formularioReactive();
  }

  onBack() {
    this.router.navigate(['/home/material']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelect(event: any) {
    this.errImg = false
    const file = event.addedFiles[0]
    this.file = file;
  }

  onRemove() {
    this.file = new File([], '');
  }
}
