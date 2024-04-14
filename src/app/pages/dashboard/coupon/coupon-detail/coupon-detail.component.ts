import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.css']
})
export class CouponDetailComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  couponDetails: any;
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
    private noti: NotificacionService,
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
        this.getCoupon(Number(id));
      }
    }
  }

  getCoupon(id: any) {
    this.gService
      .get('couponexchange', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.couponDetails = data;
        this.uploadImg(this.couponDetails);
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

  
  onBack() {
    this.router.navigate(['/home/coupon']);
  }

}
