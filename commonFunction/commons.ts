const { test, expect } = require("@playwright/test");
import { Page } from "@playwright/test";
import * as data from "../testData/ascenticData.json";

class commons {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Visit home page and Verify hompage
  public async visitPage() {
    await this.page.goto("/");
    await this.page.locator('#declineButton').click();
    await expect(this.page.locator('#logo')).toBeVisible();
  };

  //Verify itme using menue option verification
  public async selectItemFromMenu () {
    //Seleting the menu --> Gaming option
    await this.page.locator('//span[@class = "burger-wrapper"]').click();
    await this.page.locator('//a[@itemid= "contentbean:107144"]').click();
    await expect(this.page.locator('//h1[contains(text(), " Gaming ")]'))
      .toHaveText(' Gaming ');
    await this.page.locator('//img[contains(@alt, "Menu icon-vr-banner-2022-kategori") and (@loading="eager")]')
      .click();
  };

  //Verify filtering items
  public async filterItem(){//Filter by color
    await this.page.locator('//button//img[contains(@alt,"Svart") and (@height="40")]')
      .click();
    await expect(this.page.locator('//button[@data-template="filter"]//span[contains(text(), "Svart")]'))
      .toBeVisible();
  };

  //Verify checking products using store option
  public async viewProductsInStore () {
    //Selecting store page button
    await this.page.locator('//span[@class= "mat-checkbox-inner-container"]').click();
    await expect(this.page.locator('//div[contains(text(), "Hitta en butik")]'))
      .toHaveText('Hitta en butik');
    await expect(this.page.locator('//div[contains(@class, "store-finder-component__active-area")]'))
      .toBeVisible();
    
    //Verify one random store
    await this.page.locator('//div[@storeid="2503"]').click();
    await expect(this.page.locator('//button[contains(text(), "Butiksinformation")]'))
      .toBeVisible();

    //Closing button after seleting store
    await this.page.locator('//button[@class="close-button"]').click();
    await expect(this.page.locator('//h1[contains(text(), " VR gaming ")]'))
      .toBeVisible();
  };

  //Verifying customer service page and selecting 2 services to verify
  public async customerServicePage () {
    await this.page.goto(data.cusromerService.cusromerServiceURL);
    await expect(this.page.locator('//h1[contains(@class, "first-headline")]'))
      .toHaveText(data.customerService.customerServiceText);

    //Verify one of Customer Service Feature: Repair and support
    await expect(this.page.locator('//a[contains(text(), " Reparation och support ")]'))
      .toHaveText(data.cusromerService.repairAndSupport);
    await this.page.locator('//a[contains(text(), " Reparation och support ")]')
      .click();
    await expect(this.page.locator('//h1[contains(text(), " Hjälp och support ")]'))
      .toHaveText(" Hjälp och support ");
    await expect(this.page.locator('//strong[contains(text(), "Fungerar ")]'))
      .toHaveText(data.cusromerService.helpAndSupportPara);
  };

  //Verify one of Customer Service Feature: Track your delivery
  public async customerServicePageTrackYourDelivery () {
    await this.page.goto(data.cusromerService.cusromerServiceURL);
    await expect(this.page.locator('//h1[contains(@class, "first-headline")]'))
      .toHaveText(data.customerService.customerServiceText);

    await expect(this.page.locator('//a[contains(text(), " Spåra din leverans ")]'))
    .toHaveText(data.cusromerService.trackYourDelivery);
    await this.page.locator('//a[contains(text(), " Spåra din leverans ")]')
      .click();
    await expect(this.page.locator('//h1[contains(text(), " Spåra din leverans ")]'))
      .toHaveText(" Spåra din leverans ");
    await expect(this.page.locator('//p[contains(text(), "ar du ")]'))
      .toHaveText(data.cusromerService.trackYourDeliveryPara);
  };

  //Verify search bar option
  public async searchBarFunction() {
    await this.page.locator('//input[@type="search"]')
      .fill(data.searchBarData.typeText);
    await expect(this.page.locator('#iphone-13-pro-max'))
      .toBeVisible();
    await this.page.waitForTimeout(5000);
    await this.page.locator('#iphone-13-pro-max')
      .click();
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator('//span[contains(@class, "search-heading")]'))
      .toHaveText(data.searchReult.searchReultText);
    await expect(this.page.locator('//h1[contains(@class, "search-heading")]'))
      .toBeVisible();
    await expect(this.page.locator('//div[contains(@class, "product-list__product")]'))
      .toBeVisible();
  };

  //Verify add to shopping cart and payment procedure
  public async addToShoppingCartAndPaymentProcedure() {
    //Adding to shopping cart: Select a product
    await this.page.getByTitle('iPhone 13 Pro Max silikonfodral med MagSafe (Abyss Blue) - Elgiganten').getByRole('link').first().click();
    await expect(this.page.locator('//h1[contains(text(), "iPhone 13 Pro Max silikonfodral med MagSafe (Abyss Blue)")]')).toBeVisible();
    await expect(this.page.locator('//img[@alt= "Apple"]')).toBeVisible();

    //Adding to shopping cart: Add to card
    //Fill data to See when we can deliver to you
    await this.page.locator('//input[@formcontrolname="postalCode"]')
      .fill(data.addToShoppingCart.zipCode);
    await this.page.locator('//button[@elk-ta = "addToCart-button"]').click();
    await this.page.locator('//span[contains(text(), "Till kassan")]').click();
    
    //Verify added item details
    await expect(this.page.locator('elk-checkout-context-switch'))
      .toBeVisible();
    await expect(this.page.getByText('iPhone 13 Pro Max silikonfodral med MagSafe (Abyss Blue)'))
      .toBeVisible();
    
    //Fill checkout details
    await this.page.getByLabel('E-postadress *').click();
    await this.page.getByRole('combobox', { name: 'E-postadress' }).fill('test@gmail.com');
    await this.page.getByLabel('ÅÅÅÅMMDDXXXX').click();
    await this.page.getByLabel('ÅÅÅÅMMDDXXXX').fill(data.addToShoppingCart.socialSecurity);
    
    await this.page.getByRole('button', { name: 'Lägg till adress manuellt' }).click();
    await this.page.getByPlaceholder('+').click();
    await this.page.getByPlaceholder('+').fill(data.addToShoppingCart.mobile);
    await expect(this.page.locator('//mat-hint[@id="mat-hint-2"]'))
      .toBeVisible();

    //Select Välj leveransmetod option
    await this.page.locator('//h3[contains(text(), " 2. Välj leveransmetod ")]').click();
    await expect(this.page.locator('//strong[contains(text(), " GRATIS - Boka")]'))
      .toBeVisible();
    await this.page.locator('//strong[contains(text(), " GRATIS - Boka")]').click();
    await this.page.locator('//strong[contains(text(), "Kortbetalning")]').click();
    
    //Fill the credit card details
    await this.page.frameLocator('iframe[title="Iframe för utgångsdatum"]').getByPlaceholder('MM/ÅÅ').click();
    await this.page.frameLocator('iframe[title="Iframe för utgångsdatum"]').getByPlaceholder('MM/ÅÅ').fill(data.addToShoppingCart.expDate);
    await this.page.frameLocator('iframe[title="Iframe för säkerhetskod"]').getByPlaceholder('siffror').click();
    await this.page.frameLocator('iframe[title="Iframe för säkerhetskod"]').getByPlaceholder('siffror').fill(data.addToShoppingCart.cvcNo);
  };

  //Verify to check item from shopping cart
  public async viewItemFromCart() {
    await this.page.getByLabel('Till Elgigantens startsida').click();
    await expect (this.page.getByRole('button', { name: 'Kundvagn Antal produkter i' })).toBeVisible();

    //Select the cart
    await this.page.getByRole('button', { name: 'Kundvagn Antal produkter i' }).click();
    await expect (this.page.locator('//button[contains(text(), " Kassa ")]')).toBeVisible();
    await this.page.locator('//button[contains(text(), " Kassa ")]').click();
  };
};

//Export the common fucntion access it from main test runner
export default commons;
