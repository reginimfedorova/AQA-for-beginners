import {expect} from '@playwright/test';
export class MyAccountPage{
    constructor(page){
        this.page = page;
        this.items = page.locator('#account-order-0 ul > li');
        this.totalAmountField = page.locator('#account-order-0 p', {hasText: 'Total Amount:'});
        this.logoutButton = page.locator('[id="account-logout-button"]');
    
    }

    // async checkFinalOrder(items){
    //     const totalPrice = Number(items.firstProduct.price.replace('$', '')) + Number(items.secondProduct.price.replace('$', ''));
    //     console.log(totalPrice);
 


    // }

    async logout(){
        await this.page.pause();
        await this.logoutButton.click();
        
    }

}