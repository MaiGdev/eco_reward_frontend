import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';
import { CenterDialogComponent } from '../center-dialog/center-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  centerData: any; //respuesta del API
  materialData: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.listCenter();
    this.listMaterial();
  }

  listCenter() {
    this.gService
      .list('center/')
      // pipe
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        /*  console.log(response); */
        this.centerData = response;
      });
  }

  listMaterial() {
    this.gService
      .list('material/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.materialData = response;
        this.materialData.forEach((mate: any) => {
        });
        console.log(this.materialData);
      });
  }

  openMaterialDialog(id: number) {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      data: { id: id }, // Pasa el id como dato al diálogo
    });
  }
  openCenterDialog(id: number) {
    const dialogRef = this.dialog.open(CenterDialogComponent, {
      data: { id: id }, // Pasa el id como dato al diálogo
    });
  }
}
