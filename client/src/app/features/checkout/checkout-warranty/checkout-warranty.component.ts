import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutService } from '../../../core/services/checkout.service';
import { CartService } from '../../../core/services/cart.service';
import { Warranty } from '../../../shared/models/warranty';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-checkout-warranty',
  standalone: true,
  imports: [
    MatRadioModule,
    CurrencyPipe
  ],
  templateUrl: './checkout-warranty.component.html',
  styleUrl: './checkout-warranty.component.scss'
})
export class CheckoutWarrantyComponent implements OnInit {
  checkoutService = inject(CheckoutService);
  cartService = inject(CartService);
  warrantyComplete = output<boolean>();

  ngOnInit(): void {
    this.checkoutService.getWarranties().subscribe({
      next: Warranty => {
        if (this.cartService.cart()?.warrantyId) {
          const _warranty = Warranty.find(x => x.id === this.cartService.cart()?.warrantyId);
          if (_warranty) {
            this.cartService.selectedwarranty.set(_warranty);
            this.warrantyComplete.emit(true);
          }
        }
      }
    });
  }


  async updateWarranty(_warranty: Warranty) {
    this.cartService.selectedwarranty.set(_warranty);
    const cart = this.cartService.cart();
    if (cart) {
      cart.warrantyId = _warranty.id;
      await firstValueFrom(this.cartService.setCart(cart));
      this.warrantyComplete.emit(true);
    }
  }

}
