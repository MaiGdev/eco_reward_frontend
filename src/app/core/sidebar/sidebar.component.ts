import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../services/nav.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ChangePasswordModalComponent } from 'src/app/pages/dashboard/user/user-password-moda/change.password.modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  datos: any; //respuesta del API
  destroy$: Subject<boolean> = new Subject<boolean>();
  navItems: any;

  constructor(
    public navService: NavService,
    private userService: UserService,
    private router: Router
  ) {
    this.loadUser();
  }

  loadUser() {
    this.filterNavItem(this.userService.getInfo());
  }

  ngOnInit(): void {
    this.userService.userChanges().subscribe((data) => {
      this.filterNavItem(data);
    });
  }

  filterNavItem(data: any) {
    if (data) {
      const { user, center, isSuperAdmin, isCenterAdmin, isClient } = data;
      var items: any[] = navItems;
      if (user) {
        if (isSuperAdmin) {
          var items: any[] = navItems;
          items.map((item: any) => {
            if (item?.route && item.route.includes('home/center')) {
              item.route = `home/center/`;
            }
          });
          const navItemsFiltrados = items.filter(
            (item) =>
              item.displayName !== 'Mis cupones' &&
              item.displayName !== 'Canjear'
          );
          this.navItems = navItemsFiltrados;
        } else if (center && isCenterAdmin) {
          var items: any[] = navItems;
          items.map((item: any) => {
            if (item?.route && item.route.includes('home/center')) {
              item.route = `home/center/${center.centerID}`;
            }
          });

          const navItemsFiltrados = items.filter(
            (item) =>
              item.displayName !== 'Mis cupones' &&
              item.displayName !== 'Canjear'
          );

          this.navItems = navItemsFiltrados.filter(
            (u: any) => u.route !== 'home/user'
          );
        } else if (isClient) {
          var items: any[] = navItems;
          this.navItems = items.filter((item) => {
            return (
              item.navCap === 'Inicio' ||
              item.displayName === 'Dashboard' ||
              item.navCap === 'Módulos' ||
              item.displayName === 'Historial de Canje' ||
              item.displayName === 'Mis cupones' ||
              item.displayName === 'Canjear'
            );
          });
        }
      }
      this.router.navigate(['home/dashboard']);
    } else this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
