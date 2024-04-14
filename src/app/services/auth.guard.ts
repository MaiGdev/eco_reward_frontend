import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NotificacionService, TipoMessage } from '../share/notificacion.service';
import { UserService } from './user.service';

export class UserGuard {
  authService: UserService = inject(UserService);
  router: Router = inject(Router);
  noti: NotificacionService = inject(NotificacionService);
  auth: boolean = false;
  currentUser: any;
  constructor() {
    this.authService.isAuthenticated.subscribe((value) => (this.auth = value));
    this.authService.getUser.subscribe((user) => (this.currentUser = user));
  }
  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.auth) {
      const userRole = this.currentUser.user.role;
      if (
        route.data['roles'].length && !route.data['roles'].includes(userRole)
      ) {
        this.noti.mensajeRedirect(
          'Usuario',
          `Usuario Sin permisos para acceder`,
          TipoMessage.warning,
          '/home'
        );
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    } else {
        this.noti.mensajeRedirect(
            'Usuario',
            `Usuario No autenticado`,
            TipoMessage.warning,
            '/login'
          );
          return false;
    }
    
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  let userGuard = new UserGuard();
  return userGuard.checkUserLogin(route);
};
