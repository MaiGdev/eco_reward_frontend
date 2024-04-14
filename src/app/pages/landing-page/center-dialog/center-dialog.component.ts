import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-center-dialog',
  templateUrl: './center-dialog.component.html',
  styleUrls: ['./center-dialog.component.css'],
})
export class CenterDialogComponent {
  datos: any; // Respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<CenterDialogComponent>,
    private gService: GenericService
  ) {
    this.datos = data; // Inicializar datos con los datos proporcionados
    this.getMaterial(data.id);
  }

  getMaterial(id: any) {
    this.gService
      .get('center', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        /*  console.log(data); */
        this.datos = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
