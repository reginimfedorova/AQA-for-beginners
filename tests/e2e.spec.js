import { test, expect } from '@playwright/test';

import {cardData} from '../data/testData';
import {CatalogPage} from '../page-object/Catalog.page';
import {BasketPage} from '..//page-object/Basket.page';
import {CheckOutPage} from '../page-object/CheckOut.page';
import {MyAccountPage} from '../page-object/MyAccount.page';

//test.Timeout(50 * 1000);
//test.use({viewport: {width: 1024, height: 760}});

test.describe('E2E: order flow', () => {
    test.beforeAll(async () => {
        console.log('beforeAll: prepare test data');
        console.log('beforeAll: Generate user');
        console.log('beforeAll: ready');
    });

    test.beforeEach(async({page}) => {
        console.log('beforeEach: preconditions');
        await page.goto('/');
    });

    test.afterEach(async({page}, testInfo) =>{
        if (testInfo.status !== testInfo.expectedStatus){
            console.log(`afterEach: test failed: ${testInfo.title()}`);

            await page.screenshot({
                path: `test-results/${testInfo.title} - failes.png`, 
                fullPage:true
            })
        };
    });

    test.afterAll(async () => {
        console.log('AfterAll: cleanup test data');
    });

test('Create user, login,order 2 items, payments', async ({ page }) => {

  const catalogPage = new CatalogPage(page);
  const checkoutPage = new CheckOutPage(page);
  const myAccountPage = new MyAccountPage(page);
  const basketPage = new BasketPage(page);


 let items; 

  await test.step('Select two items', async() => {
      items = await catalogPage.selectProduct();
  }) 

  await test.step('Verify basket counter(qty)', async() => {
      await expect (catalogPage.basketCount).toContainText('2', {timeout:3000});
  }) 

  await test.step('Goto Basket', async() => {
        await catalogPage.gotoBasket();
  })  

  await test.step('Check products details in Basket', async() => {
// Check products details
  await expect(basketPage.firstProductItem).toHaveText(items.firstProduct.name);
  await expect(basketPage.secondProductItem).toHaveText(items.secondProduct.name);
  await expect(basketPage.firstItemPrice).toHaveText(items.firstProduct.price);
  await expect(basketPage.secondItemPrice).toHaveText(items.secondProduct.price);
  })

  await test.step('Goto Basket', async() => {
      await basketPage.checkTotalPrice();
  })

  await test.step('Fill payment data and submit payment', async() => {
      await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
  })

  
  await test.step('Verify successfull order', async() => {
      await expect(checkoutPage.successOrder).toBeVisible({timeout:10000});         
      await expect(checkoutPage.page).toHaveURL('/checkout');

  })
  
  await test.step('Go to Ny account page', async() => {
        await checkoutPage.goToMyAccount();
        await expect(checkoutPage.page).toHaveURL('/account');
  })
 
  await test.step('Verify items list', async() => {
  await expect(myAccountPage.items.first()).toBeVisible();
  await expect(myAccountPage.items.last()).toBeVisible();
  await expect(myAccountPage.logoutButton).toBeEnabled();  
  })
  
  await test.step('Logout button', async() => {
      await myAccountPage.logout();
  })

})  
});

