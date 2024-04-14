import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-center-all',
  templateUrl: './center-all.component.html',
  styleUrls: ['./center-all.component.css'],
})
export class CenterAllComponent {
  isSuperAdmin: boolean = false;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filteredNameCenter: any;
  filteredProvinceCenter: any;
  filteredMaterialCenter: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'operating_hours', 'status', 'actions'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private userService: UserService
  ) {
    this.listCenter();
    this.realoadUser(this.userService.getInfo());
  }

  ngAfterViewInit(): void {
    this.listCenter();
    this.userService.userChanges().subscribe((data) => this.realoadUser(data));
  }

  realoadUser(data: any) {
    const { user, isSuperAdmin } = data;
    if(user && isSuperAdmin){
      this.router.navigate(['home', 'center']);
    } else if (user) {
      if (user) {
        this.gService
          .list(`center/user/${user.userID}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: any) => {
            this.centerDetail(response.centerID);
          });
      } else {
        this.router.navigate(['home/dashboard']);
      }
    } else this.router.navigate(['']);
  }

  listCenter() {
    this.gService
      .list('center/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.datos = response;
        this.filteredNameCenter = this.datos;
        this.dataSource = new MatTableDataSource(this.filteredNameCenter);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.datos);
      });
  }

  toggleStatus(status: boolean, centerId: any) {
    this.gService
    .update(`center/update/status`, {id:centerId, status: status})
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.listCenter();
    });
  }

  filterNameCenter(text: string) {
    if (!text) {
      this.filteredNameCenter = this.datos;
    } else {
      this.filteredNameCenter = this.datos.filter((center: any) =>
        center?.name?.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (this.filteredNameCenter.length > 0) {
      this.dataSource.data = this.filteredNameCenter;
    }
  }

  filterProvinceCenter(text: string) {
    if (!text) {
      this.filteredProvinceCenter = this.datos;
    } else {
      this.filteredProvinceCenter = this.datos.filter((center: any) =>
        center?.Address?.province.toLowerCase().includes(text.toLowerCase())
      );
    }
    if (this.filteredProvinceCenter.length > 0) {
      this.dataSource.data = this.filteredProvinceCenter;
    }
  }

  filterMaterialCenter(text: string) {
    if (!text) {
      this.filteredMaterialCenter = this.datos;
    } else {
      this.filteredMaterialCenter = this.datos.filter((center: any) => {
        // Verifica si hay materiales y utiliza some para verificar si al menos uno coincide
        return center?.Center_Material?.some((material: any) =>
          material?.Recyclable_Material?.name
            ?.toLowerCase()
            .includes(text.toLowerCase())
        );
      });
    }

    if (this.filteredMaterialCenter.length > 0) {
      this.dataSource.data = this.filteredMaterialCenter;
    }
  }

  centerDetail(id: number) {
    this.router.navigate(['home', 'center', id]);
  }

  createCenter() {
    this.router.navigate(['home', 'center', 'create']);
  }
  updateCenter(id: number) {
    this.router.navigate(['home', 'center', 'update', id]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
