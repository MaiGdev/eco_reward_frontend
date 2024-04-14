import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string = "";
  ecoCoins: any = {};
  centroAcopio: any = {};
  estadisticas: any = {};
  adminEstadisticas: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserRole();
  }

  getUserRole() {
    this.userService.getUser.subscribe((user: any) => {
      if (user) {
        if (user.isSuperAdmin) {
          this.userRole = 'admin';
          this.loadSuperAdminDashboard(user);
        } else if (user.isCenterAdmin) {
          this.userRole = 'admin_centro_acopio';
          this.loadCenterAdminDashboard(user);
        } else if (user.isClient) {
          this.userRole = 'cliente';
          this.loadClientDashboard(user);
        }
      }
    });
  }

  loadSuperAdminDashboard(user: any) {
  }

  loadCenterAdminDashboard(user: any) {
  }

  loadClientDashboard(user: any) {
  }
}
