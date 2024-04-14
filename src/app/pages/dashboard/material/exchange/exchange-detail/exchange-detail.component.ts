// Import ViewChild and AfterViewInit
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { InvoiceComponent } from 'src/app/core/modal/invoice.component';

@Component({
  selector: 'app-exchange-detail',
  templateUrl: './exchange-detail.component.html',
  styleUrls: ['./exchange-detail.component.css']
})
export class ExchangeDetailComponent implements AfterViewInit { // Implement AfterViewInit
  exchangeID: any = 0;
  exchangeData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  
  displayedColumns: string[] = ['material_name', 'quantity', 'material_price', 'subtotal', 'eco_coins'];

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.exchangeID = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(this.exchangeID))) {
      this.loadData(Number(this.exchangeID));
    }
  }

  openInvoiceDialog(): void {
    const dialogRef = this.dialog.open(InvoiceComponent, {
      data: this.exchangeData  // Pasar los detalles de la factura al diálogo
    });
  }
  
  ngAfterViewInit() {
    // Move the paginator setup here
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.exchangeData.exchange_details.length;
    this.paginator.pageSizeOptions = [5, 10, 25];
  }

  loadData(id: number) {
    this.gService
      .get('materialexchange', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.exchangeData = data;
        this.dataSource = new MatTableDataSource(this.exchangeData.exchange_details);
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
