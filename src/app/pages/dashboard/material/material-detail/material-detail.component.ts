import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css'],
})
export class MaterialDetailComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  materialDetails: any;
  isSuperAdmin: boolean = false;
  isCenterAdmin: boolean = false;
  isClient: boolean = false;
  id: number = 0
  file: File = new File([], '');

  constructor(
    private cdr: ChangeDetectorRef,
    private gService: GenericService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.isSuperAdmin = this.userService.getInfo().isSuperAdmin;
    this.isCenterAdmin = this.userService.getInfo().isCenterAdmin;
    this.isClient = this.userService.getInfo().isClient;
    this.initData(this.id);
  }
  
  initData(id: number){
    if (!isNaN(Number(id))) {
      if(Number(id)){
        this.getMaterial(Number(id));
      }
    }
  }

  getMaterial(id: any): void {
    this.gService
      .get('material', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.materialDetails = data;
        this.uploadImg(this.materialDetails);
      });
  }

  uploadImg(couponDetails: any){
    this.file = this.getBase64ToFile(couponDetails?.base64Image);
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onBack() {
    this.router.navigate(['/home/material']);
  }
}
