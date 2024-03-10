import { test, expect } from "@playwright/test";
import * as data from "../testData/ascenticData.json";
import commons from "../commonFunction/commons";
let common;

test.beforeEach('This always verify the home landing page', async({page}) => {
    //This step will vist the page before each test
    common = new commons(page);
    await common.visitPage();
});

test.afterEach('', async({page}) => {
    //This step will close the page after each test
    await page.context().close();
});

test.describe('Steps for verifying features', () => {
    test('Verify idendified features', async ({page}) => {
        //Feature 1: Verify item selection using menue option
        await common.selectItemFromMenu();

        // //Fwature 2: Verify filtering and view product in store
        await common.filterItem();
        await common.viewProductsInStore();

        // //Feature 3: Verify the customer service page
        await common.customerServicePage();
        await common.customerServicePageTrackYourDelivery();

        //Feature 4: Verifying search bar of web page
        await common.searchBarFunction();

        //Fwature 5: Verify Add card option and payment
        await common.addToShoppingCartAndPaymentProcedure();    
    });
});   