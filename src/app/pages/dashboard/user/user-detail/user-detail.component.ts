import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserDetailDataSource, UserDetailItem } from './user-detail-datasource';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements AfterViewInit {
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  //gService es la variable que hace la solucitud
  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.getUser(Number(id));
    }
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  getUser(id: any) {
    this.gService
      .get('user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.datos = data.user;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
