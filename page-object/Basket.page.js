import { expect } from '@playwright/test';
export class BasketPage {
    constructor(page,tabletNameValue,coffeMachineNameValue, tabletPriceValue, coffeMachinePriceValue ){
       this.page = page;
       this.firstProductItem = page.locator('[id="cart-item-name-6"]');
       this.secondProductItem = page.locator('[id="cart-item-name-5"]');
       this.firstItemPrice = page.locator('[id="cart-item-price-6"]');
       this.secondItemPrice = page.locator('[id="cart-item-price-5"]');
       
       this.totalValue = page.locator('[id="cart-total"]');
       this.checkoutButton = page.locator('[id="cart-checkout-button"]');

       this.addFirstItemButton = this.page.locator('[id="cart-item-increase-6"]');
       this.removeFirstItemButton = this.page.locator('[id="cart-item-decrease-6"]');

    }

    async checkTotalPrice() {
 
//        await this.addFirstItemButton.click({clickCount: 5, delay: 1000});
//        await this.page.pause();
       await this.checkoutButton.click();
       await this.page.waitForURL('/checkout');
    }

}