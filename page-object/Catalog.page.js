import {expect} from '@playwright/test';

export class CatalogPage{
    constructor(page){
        this.page = page;
        this.coffeMachineProduct = page.locator('[id = "product-add-6"]');
        this.tabletProduct = page.locator('[id="product-add-5"]');
        this.basketCount = page.locator('[id = "nav-cart"]');

        this.tabletName = page.locator('[id="product-name-5"]');
        this.coffeMachineName = page.locator('[id="product-name-6"]');
        this.tabletPrice = page.locator('[id="product-price-5"]');
        this.coffeMachinePrice = page.locator('[id="product-price-6"]');

        this.tabletNameValue = '';
        this.coffeMachineNameValue = '';
        this.tabletPriceValue = '';
        this.coffeMachinePriceValue = '';

    }
    async selectProduct(){
        await this.coffeMachineProduct.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState('networkidle');
        await this.basketCount.waitFor();
        await expect (this.basketCount).toContainText('2', {timeout:3000});
        await this.saveProductInfo();
        await this.basketCount.click();

    }
    async saveProductInfo() {
        this.tabletNameValue = await this.tabletName.innerText();
        this.coffeMachineNameValue = await this.coffeMachineName.innerText();
        this.tabletPriceValue = await this.tabletPrice.innerText();
        this.coffeMachinePriceValue = await this.coffeMachinePrice.innerText();

    }
}
