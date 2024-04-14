import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-user-wallet-modal',
  templateUrl: './user-wallet-modal.component.html',
  styleUrls: ['./user-wallet-modal.component.css'],
})
export class UserWalletModalComponent {
  userId: any;
  user: any;
  coinsAvailable: any = 0;
  redeemedCoins: any = 0;
  totalCoins: any = 0;
  couponExchangeHistory: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.data.userId;
    console.log('ID de usuario recibido:', this.userId);
    this.getUser(this.userId);
    this.getCouponExchangeHistory(this.userId);
  }

  getUser(id: any) {
    this.gService
      .get('user', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.user = data.user;
        this.totalCoins = this.user.Client_Eco_Coins.reduce(
          (total: any, coin: any) => total + coin.balance,
          0
        );
      });
  }
  getCouponExchangeHistory(id: any) {
    this.gService
      .get('couponexchangehistory/getByUserId', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.couponExchangeHistory = data;

        this.redeemedCoins = this.couponExchangeHistory.reduce(
          (total: any, couponExchange: any) => {
            return total + couponExchange.Coupon_Exchange.eco_coins_required;
          },
          0
        );

        this.coinsAvailable = this.totalCoins - this.redeemedCoins;
      });
  }
}
