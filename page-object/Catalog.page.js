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

    }
    async selectProduct(){
        await this.coffeMachineProduct.click({delay: 2000});
        await this.tabletProduct.click({delay: 2000});
        await this.page.waitForLoadState('networkidle');
        await this.basketCount.waitFor();

        const itemsInfo = await this.getProductInfo();

        return itemsInfo;

    }

    async gotoBasket(){
        await this.basketCount.click();
    }

    async getProductInfo() {
        return{
            firstProduct:{
                name: await this.coffeMachineName.innerText(),
                price: await this.coffeMachinePrice.innerText()
            },

            secondProduct:{
                name: await this.tabletName.innerText(),
                price: await this.tabletPrice.innerText()
            }
        }

    }
}
