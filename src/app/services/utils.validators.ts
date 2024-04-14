import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsValidators {
  urlAPI: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  colorTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log(control.value)
      const color = control.value;
      return this.checkColorAvailability(color).pipe(
        map((isTaken: boolean) => {
          return (isTaken ? { Taken: true } : null)
        }),
        catchError(() => of(null))
      );
    };
  }

  checkColorAvailability(color: string): Observable<boolean> {
    return this.http.get<boolean>(this.urlAPI+`material/checkcolor/${color.replaceAll("#","")}`);
  }
}
