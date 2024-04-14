import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.css'],
})
export class HeaderLandingComponent {
  IsLogged: boolean = false;
  constructor(
    private userService: UserService
  ) {
    this.verifyUser(this.userService.getInfo())
  }

  ngOnInit(): void {
    this.userService.userChanges().subscribe((data) => {
      this.verifyUser(data)
    });
  }

  verifyUser(data: any){
    this.IsLogged = data&&data.user? true: false;
  }
}
