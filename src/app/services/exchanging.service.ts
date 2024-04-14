import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class ExchangeItem {
  materialID: number = 0;
  materialDetails: any;
  amount: number = 0;
  price: number = 0;
  subtotal: number = 0;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private exchangeData = new BehaviorSubject<ExchangeItem[]>([]);
  public currentExchangeData$ = this.exchangeData.asObservable();
  public itemsQuantity = new Subject<number>();

  constructor() {
    const storedData = localStorage.getItem('exchangeData');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    this.exchangeData = new BehaviorSubject<any>(parsedData || []);
    this.currentExchangeData$ = this.exchangeData.asObservable();
  }

  saveExchange(): void {
    localStorage.setItem(
      'exchangeData',
      JSON.stringify(this.exchangeData.getValue())
    );
  }

  getData(){
    return this.exchangeData.getValue()
  }

  addItemToExchange(material: any, isNew: boolean): void {
    const newItem = new ExchangeItem();
    newItem.materialID = material.materialID;
    newItem.price = material.price;
    newItem.amount = isNew? 1: material.amount;
    newItem.materialDetails = material;
    newItem.subtotal = this.calculateSubtotal(newItem);

    let exchangeList = this.exchangeData.getValue();

    if (exchangeList) {
      let objIndex = exchangeList.findIndex(
        (obj) => obj.materialID == newItem.materialID
      );

      if (objIndex != -1) {
        if (material.hasOwnProperty('amount')) {
          if (material.amount <= 0) {
            this.removeFromExchange(newItem.materialID);
            return;
          } else {
            exchangeList[objIndex].amount = newItem.amount;
            exchangeList[objIndex].subtotal = newItem.subtotal;
          }
        } else {
          exchangeList[objIndex].amount += 1;
        }
      } else {
        exchangeList.push(newItem);
      }
    } else {
      exchangeList = [];
      exchangeList.push(newItem);
    }
    this.exchangeData.next(exchangeList);
    this.itemsQuantity.next(this.calculateTotalItems());
    this.saveExchange();
  }

  public removeFromExchange(materialID: any) {
    let exchangeList = this.exchangeData.getValue();
    let objIndex = exchangeList.findIndex(
      (obj) => obj.materialID == materialID
    );
    if (objIndex != -1) {
      exchangeList.splice(objIndex, 1);
    }
    this.exchangeData.next(exchangeList);
    this.itemsQuantity.next(this.calculateTotalItems());
    this.saveExchange();
  }

  get totalItemsCount(): Observable<number> {
    this.itemsQuantity.next(this.calculateTotalItems());
    return this.itemsQuantity.asObservable();
  }

  calculateTotalItems() {
    let exchangeList = this.exchangeData.getValue();
    let sum = 0;
    if (exchangeList != null) {
      exchangeList.forEach((obj) => {
        sum += obj.amount;
      });
    }
    return sum;
  }

  public clearExchange() {
    this.exchangeData.next([]);
    this.itemsQuantity.next(0);
    this.saveExchange();
  }

  public getTotalAmount(): number {
    let total = 0;
    let exchangeList = this.exchangeData.getValue();
    if (exchangeList != null) {
      exchangeList.forEach((item: ExchangeItem) => {
        total += item.amount * item.price;
      });
    }

    return total;
  }

  private calculateSubtotal(item: ExchangeItem) {
    return item.price * item.amount;
  }
}
