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

test('Create user, login,order 2 items, payments', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const a = 0;
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const checkoutPage = new CheckOutPage(page);
  const myAccountPage = new MyAccountPage(page);
  const basketPage = new BasketPage(page);

  await registerPage.openLoginPage();
  await registerPage.fillRegistrationForm(newUser1);
  await loginPage.login(newUser1.email, newUser1.password);
  const items = await catalogPage.selectProduct();
      await expect (catalogPage.basketCount).toContainText('2', {timeout:3000});
  await catalogPage.gotoBasket();

 // Check products details
  await expect(basketPage.firstProductItem).toHaveText(items.firstProduct.name);
  await expect(basketPage.secondProductItem).toHaveText(items.secondProduct.name);
  await expect(basketPage.firstItemPrice).toHaveText(items.firstProduct.price);
  await expect(basketPage.secondItemPrice).toHaveText(items.secondProduct.price);

  // Этот метод сам внутри считает сумму, проверит её и перейдет к чекауту
  await basketPage.checkTotalPrice();

  // Сразу переходим к заполнению платежных данных (так как checkTotalPrice уже кликнул по кнопке)
  await checkoutPage.fillPaymentData(cardData.cardNumber, cardData.cardDate, cardData.cardCVV);
  await expect(checkoutPage.successOrder).toBeVisible({timeout:10000});         
  await expect(checkoutPage.page).toHaveURL('/checkout');
  
  await checkoutPage.goToMyAccount();
  await expect(checkoutPage.page).toHaveURL('/account');

  //await myAccountPage.checkFinalOrder(items);
  // Обратите внимание: общая сумма проверяется в BasketPage, а здесь на странице аккаунта можно проверить финал заказа
  
  await expect(myAccountPage.items.first()).toBeVisible();
  await expect(myAccountPage.items.last()).toBeVisible();
  await expect(myAccountPage.logoutButton).toBeEnabled();
  
  await myAccountPage.logout();
})  