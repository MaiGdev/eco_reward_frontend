import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css'],
})
export class UserAllComponent implements AfterViewInit {
  isSuperAdmin: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginatorUser!: MatPaginator;
  @ViewChild(MatSort) sortUser!: MatSort;

  @ViewChild(MatPaginator) paginatorCenter!: MatPaginator;
  @ViewChild(MatSort) sortCenter!: MatSort;

  userDataSource = new MatTableDataSource<any>();
  centerDataSource = new MatTableDataSource<any>();

  displayedColumns = ['identification', 'name', 'phone', 'status', 'actions'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.listUser();
    this.isSuperAdmin = this.userService.getInfo().isSuperAdmin;
  }

  ngAfterViewInit(): void {
    this.listUser();
    this.userService.userChanges().subscribe((data) => {
      this.isSuperAdmin = data.isSuperAdmin;
    });
  }

  newUser(){
    this.router.navigate(['home/user/form', 0]);
  }
  listUser() {
    // Lógica para cargar datos de usuarios
    this.gService
      .list('user/role/3')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.userDataSource = new MatTableDataSource(response);
        this.userDataSource.sort = this.sortUser;
        this.userDataSource.paginator = this.paginatorUser;
      });

      this.gService
      .list('user/role/2')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.centerDataSource = new MatTableDataSource(response);
        this.centerDataSource.sort = this.sortCenter;
        this.centerDataSource.paginator = this.paginatorCenter;
      });
  }

  userDetail(id: number) {
    this.router.navigate(['home', 'user', id]);
  }

  userUpdate(id: number) {
    this.router.navigate(['home/user/form', id]);
  }

  toggleStatus(status: boolean, user: any) {
    this.gService
    .update(`user/update/status`, {id:user.userID, status: status})
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      console.log(response);
      this.listUser();
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
