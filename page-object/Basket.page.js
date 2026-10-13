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

       this.tabletNameValue = tabletNameValue;
       this.coffeMachineNameValue = coffeMachineNameValue;
       this.tabletPriceValue = tabletPriceValue;
       this.coffeMachinePriceValue = coffeMachinePriceValue;   

    }

    async compareProductDetails() {
        await expect(this.firstProductItem).toHaveText(this.coffeMachineNameValue);
        await expect(this.secondProductItem).toHaveText(this.tabletNameValue);
        await expect(this.firstItemPrice).toHaveText(this.coffeMachinePriceValue);
        await expect(this.secondItemPrice).toHaveText(this.tabletPriceValue);

    }

    async checkTotalPrice() {
       const firstProductPriceNumber = Number((await this.firstItemPrice.innerText()).replace(/\D/g, ''));
       const secondProductPriceNumber = Number((await this.secondItemPrice.innerText()).replace(/\D/g, ''));

       const totalNumber = parseInt((await this.totalValue.innerText()).replace(/[^\d.]/g, ''), 10);
       
       expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
//        await this.addFirstItemButton.click({clickCount: 5, delay: 1000});
//        await this.page.pause();
       await this.checkoutButton.click();
       await this.page.waitForURL('https://aqa-app.vercel.app/checkout');
    }

}