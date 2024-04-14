import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {
  constructor(private userService: UserService) {}

  emailTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      return this.userService.checkEmailAvailability(email).pipe(
        map((isTaken: boolean) => {
          return (isTaken ? { emailTaken: true } : null)
        }),
        catchError(() => of(null))
      );
    };
  }
  
}
