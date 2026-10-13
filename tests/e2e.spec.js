import { test, expect } from '@playwright/test';

import {newUser1} from '../data/testData';
import {cardData} from '../data/testData';

import {RegisterPage} from '../page-object/Register.page';
import {LoginPage} from '../page-object/Login.page';
import {CatalogPage} from '../page-object/Catalog.page';
import {BasketPage} from '..//page-object/Basket.page';
import {CheckOutPage} from '../page-object/CheckOut.page';
import {MyAccountPage} from '../page-object/MyAccount.page';

test.setTimeout(50 * 1000);
//test.use({viewport: {width: 1024, height: 760}});

test('test', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const checkoutPage = new CheckOutPage(page);
  const myAccountPage = new MyAccountPage(page);

  await registerPage.navigate();
  await registerPage.fillRegistrationForm(newUser1);
  await loginPage.login(newUser1.email, newUser1.password);
  await catalogPage.selectProduct();

  
  const basketPage = new BasketPage(page, catalogPage.tabletNameValue, catalogPage.coffeMachineNameValue, catalogPage.tabletPriceValue, catalogPage.coffeMachinePriceValue);
  await basketPage.compareProductDetails();
  await basketPage.checkTotalPrice();

  await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
  await checkoutPage.successOrderMessage();
  await checkoutPage.goToMyAccount();

  await myAccountPage.checkFinalOrder(catalogPage.tabletPriceValue, catalogPage.coffeMachinePriceValue);
  await myAccountPage.checkTwoItems();
  await myAccountPage.logout();
  
});

          
         