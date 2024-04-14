import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-center-form',
  templateUrl: './center-form.component.html',
  styleUrls: ['./center-form.component.css'],
})
export class CenterFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear Centro';
  //Center to update
  centerInfo: any;
  administratorList: any;
  center_MaterialMaterialList: any;
  //Respuesta del API crear/modificar
  respCenter: any;

  //Sí es submit
  submitted = false;
  isCreate: boolean = true;
  idCenter: number = 0;
  centerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.getAdministratorList();
    this.getCenter_MaterialMaterialList();
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idCenter = params['id'];

      if (this.idCenter != undefined && !isNaN(Number(this.idCenter))) {
        this.isCreate = false;
        this.titleForm = 'Actualizar Centro';

        this.gService
          .get('center', this.idCenter)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.centerInfo = data;
            console.log(this.centerInfo);
            //Precargar los datos en el formulario
            this.centerForm.patchValue({
              id: this.centerInfo.centerID,
              name: this.centerInfo.name,
              province: this.centerInfo.Address.province,
              canton: this.centerInfo.Address.canton,
              district: this.centerInfo.Address.district,
              exact_address: this.centerInfo.Address.exact_address,
              phone: this.centerInfo.phone,
              operating_hours: this.centerInfo.operating_hours,
              administrator_userID: this.centerInfo.administrator_userID,
              Center_Material: this.centerInfo.Center_Material.map(
                ({ materialID }: { materialID: number }) => materialID
              ),
            });
          });
      }
    });
  }

  getAdministratorList() {
    this.administratorList = null;
    this.gService
      .list('user/role/2')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.administratorList = data;
      });
  }

  getCenter_MaterialMaterialList() {
    this.center_MaterialMaterialList = null;
    this.gService
      .list('center/material')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.center_MaterialMaterialList = data;
      });
  }

  formularioReactive() {
    //[null, Validators.required]
    this.centerForm = this.fb.group({
      id: [null, null],
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ]),
      ],
      province: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],
      canton: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],
      district: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
      ],
      exact_address: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ],
      phone: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d{4}-\d{4}$/), // Acepta el formato 0000-0000
        ]),
      ],
      operating_hours: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ]),
      ],
      administrator_userID: [null, Validators.required],
      Center_Material: [null, Validators.required],
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.centerForm.controls[control].hasError(error);
  };
  submitCenter(): void {
    this.submitted = true;
    if (this.centerForm.invalid) return;

    /* ajustar de [1, 3] a [{materialID: 1}, {materialID: 3}] */
    let materialFormat: any =
      this.centerForm
        ?.get('Center_Material')
        ?.value?.map((x: any) => ({ ['materialID']: x })) ?? [];

    this.centerForm.patchValue({ Center_Material: materialFormat });
    console.log(this.centerForm.value);

    if (this.isCreate) {
      this.gService
        .create('center', this.centerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respCenter = data;
          this.noti.mensajeRedirect(
            'Create center',
            `Center: ${data.name} created successfully`,
            TipoMessage.success,
            'home/center/'
          );
          console.log(data);
          this.router.navigate(['home/center/']);
        });
    } else {
      if (this.idCenter != undefined && !isNaN(Number(this.idCenter))) {
        this.gService
          .update('center', this.centerForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            //Obtener respuesta
            this.respCenter = data;
            this.noti.mensajeRedirect(
              'Update center',
              `Center: ${data.name} updated successfully`,
              TipoMessage.success,
              'home/center/'
            );
            console.log(data);
            this.router.navigate(['home/center/']);
          });
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.centerForm.reset();
  }

  onBack() {
    this.router.navigate(['/home/center']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
