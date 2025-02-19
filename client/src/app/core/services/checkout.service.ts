import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { map, of } from 'rxjs';
import { Warranty } from '../../shared/models/warranty';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  deliveryMethods: DeliveryMethod[] = [];
  warranties: Warranty[] = [];

  getDeliveryMethods() {
    if (this.deliveryMethods.length > 0) return of(this.deliveryMethods);
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'payments/delivery-methods').pipe(
      map(methods => {
        this.deliveryMethods = methods.sort((a,b) => b.price - a.price);
        return methods;
      })
    )
  }


  getWarranties() {
    if (this.warranties.length > 0) return of(this.warranties);
    return this.http.get<Warranty[]>(this.baseUrl + 'payments/warranty').pipe(
      map(methods => {
        this.warranties = methods.sort((a,b) => b.price - a.price);
        return methods;
      })
    )
  }


}
