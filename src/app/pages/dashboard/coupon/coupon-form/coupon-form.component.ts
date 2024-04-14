import { ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ImageUploadService } from 'service/image-upload.service';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css'],
})
export class CouponFormComponent {
  id: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'New Coupon';
  base64String: string = '';
  file: File = new File([], '');

  errImg: boolean = false;
  couponForm!: FormGroup;
  couponData: any;
  isSuperAdmin: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private userService: UserService,
    private noti: NotificacionService,
    private route: ActivatedRoute,
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.isSuperAdmin = this.userService.getInfo().isSuperAdmin;
    this.formularioReactive();
    this.initData(this.id);
  }

  initData(id: number){
    if (!isNaN(Number(id))) {
      if(Number(id)){
        this.getCoupon(Number(id));
      }
    }
  }
  
  getCoupon(id: any) {
    this.gService
      .get('couponexchange', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.setData(data);
      });
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
  setData(coupon: any){
    this.couponData = coupon;
    this.couponForm.patchValue({
      name: this.couponData.name || '',
      description: this.couponData.description || '',
      category: this.couponData.category || '',
      startValidityDate: this.couponData.start_validity_date.split("T")[0] || '',
      endValidityDate: this.couponData.end_validity_date.split("T")[0] || '',
      ecoCoinsRequired: this.couponData.eco_coins_required || 0,
    });
    // Crear un archivo File
    this.file = this.getBase64ToFile(this.couponData.base64Image);
    this.cdr.detectChanges();
  }

  formularioReactive() {
    this.couponForm = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      description: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(150),
        ]),
      ],
      category: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      startValidityDate: [null, Validators.compose([Validators.required])],
      endValidityDate: [null, Validators.compose([Validators.required])],
      ecoCoinsRequired: [
        null,
        Validators.compose([
          Validators.required,
          Validators.min(0),
          (control: AbstractControl) => {
            const value = control.value;
            if (value !== null && value <= 0) {
              return { lessThanZero: true };
            }
            return null;
          }
        ])
      ]
    });
    
  }

  submitCoupon(): void {
    if (this.couponForm.invalid || !this.file.name) {
      this.markFormGroupTouched(this.couponForm);
      if(!this.file.name) this.errImg = true
      return;
    }
    const form = this.couponForm.value;
    this.errImg = false
    const fileReader = new FileReader();
    const gService = this.gService;
    const destroy$ = this.destroy$;
    const noti = this.noti;
    const id = this.id;
    const router = this.router;

    fileReader.onload = function(event: any) {
      if (event.target && event.target.result) {
        const base64String = event.target.result.split(',')[1];

        var body = {
          name: form.name,
          description: form.description,
          category: form.category,
          startValidityDate: form.startValidityDate,
          endValidityDate: form.endValidityDate,
          ecoCoinsRequired: form.ecoCoinsRequired,
          image: base64String
        }

        if(!id){
          gService
          .create('couponexchange', body)
          .pipe(takeUntil(destroy$))
          .subscribe((data: any) => {
            noti.mensajeRedirect(
              'Registrado',
              `Cupón: ${data.name} creado correctamente`,
              TipoMessage.success,
              'home/coupon'
            );
          });
        } else {
          gService
          .update(`couponexchange/${id}`, body)
          .pipe(takeUntil(destroy$))
          .subscribe((data: any) => {
            noti.mensajeRedirect(
              'Actualizado',
              `Cupón: ${data.name} actualizado correctamente`,
              TipoMessage.success,
              'home/coupon'
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
    this.couponForm.reset();
    this.formularioReactive();
  }

  onBack() {
    this.router.navigate(['/home/coupon']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSelect(event:any) {
    this.errImg = false
    const file = event.addedFiles[0]
    this.file = file;
  }
  
  onRemove() {
    this.file = new File([], '');
  }
}
