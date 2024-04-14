import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MaterialExchangeModel } from 'src/models/MaterialExchangeModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-exchange-all',
  templateUrl: './exchange-all.component.html',
  styleUrls: ['./exchange-all.component.css'],
})
export class ExchangeAllComponent {
  isSuperAdmin!: boolean;
  isCenterAdmin!: boolean;
  isClient!: boolean;
  userLogin: any
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /*   @ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>; */
  dataSourceUser = new MatTableDataSource<any>();
  dataSourceCenter = new MatTableDataSource<any>();
  dataSourceAdmin = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumnsUser = [
    'Recycling_Center',
    'Exchange_Material_Details',
    'exchange_date',
    'acciones',
  ];
  displayedColumnsCenter = [
    'client_user',
    'Exchange_Material_Details',
    'total_eco_coins',
    'exchange_date',
    'acciones',
  ];
  displayedColumnsAdmin = [
    'Recycling_Center',
    'client_user',
    'Exchange_Material_Details',
    'total_eco_coins',
    'exchange_date',
    'acciones',
  ];
  constructor(
    private gService: GenericService,
    private router: Router,
    private userService: UserService
  ) {
    this.userLogin =  this.userService.getInfo();
    this.isSuperAdmin = this.userLogin.isSuperAdmin;
    this.isCenterAdmin = this.userLogin.isCenterAdmin;
    this.isClient = this.userLogin.isClient;
    this.listCenter();
  }

  ngAfterViewInit() {
    this.dataSourceUser.paginator = this.paginator;
    this.paginator.length =  this.datos ? this.datos.length: 0;
    this.paginator.pageSizeOptions = [5, 10, 25];

    this.userService.userChanges().subscribe((data) => {
      this.userLogin = data;
      this.listCenter();
    });
    
  }

  listCenter() {
    const { user, center, isSuperAdmin, isCenterAdmin, isClient } = this.userLogin;
    if(user && isClient){
      this.gService
      .list(`materialexchange/exchangesByUserid/${user.userID}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response as MaterialExchangeModel;
        this.dataSourceUser = new MatTableDataSource(this.datos);
        this.dataSourceUser.sort = this.sort;
      });
    } else if(center && isCenterAdmin){
      this.gService
      .list(`materialexchange/center/${center.centerID}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response as MaterialExchangeModel;
        this.dataSourceCenter = new MatTableDataSource(this.datos);
        this.dataSourceCenter.sort = this.sort;
      });
    } else if(isSuperAdmin){
      this.gService
      .list(`materialexchange/admin/${user.userID}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        console.log(response);
        this.datos = response as MaterialExchangeModel;
        this.dataSourceAdmin = new MatTableDataSource(this.datos);
        this.dataSourceAdmin.sort = this.sort;
      });
    }
  }

  exchangeDetail(id: number) {
    this.router.navigate(['home', 'material-exchange', id]);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
