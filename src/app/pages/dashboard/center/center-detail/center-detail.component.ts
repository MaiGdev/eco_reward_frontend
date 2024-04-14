import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.css'],
})
export class CenterDetailComponent {
  centerData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.getCenter(Number(id));
    }
  }

  ngOnInit(): void {
    this.userService.userChanges().subscribe((data) => {
      if(data && data.user){
        if(data && data.isSuperAdmin){
          this.router.navigate(['home/dashboard']);
        } else {
          this.setCenterData(data);
        }
      } else this.router.navigate(['']);
    });
  }

  setCenterData(data: any){
    if(data && data.center){
      this.centerData = data.center;
    }
  }

  getCenter(id: any) {
    this.gService
      .get('center', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.centerData = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
