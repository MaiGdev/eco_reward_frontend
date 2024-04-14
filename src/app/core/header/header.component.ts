import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserWalletModalComponent } from 'src/app/pages/dashboard/user/user-wallet-modal/user-wallet-modal.component';
import { UserService } from 'src/app/services/user.service';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  userLogin: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {
    this.userLogin = this.userService.getInfo();
    console.log(this.userLogin);
  }

  currentUser() {
    console.log(this.userLogin);
    this.router.navigate(['/home/user/form', this.userLogin.user.userID]);
  }

  logout() {
    this.userService.setToken('');
    this.router.navigate(['']);
  }

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(UserWalletModalComponent, {
      /*      position: { top: '10%' }, */
      /*       width: '400px', */
      data: { userId: this.userLogin.user.userID },
    });
  }
}
