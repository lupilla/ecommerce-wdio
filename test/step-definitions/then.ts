import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import reporter from "../helper/reporter";
import fs from "fs";
import CustomerPage from "../page-objects/nopcommerce.customer.page";

/**
  Verify if given user exists in customer list:
  1. Navigate and select customer options from left menu
  2. Read API response from /data folder
  3. For each user object in API response:
    - Enter the first name and last name
    - Search and confirm if user exists
  4. In case user does not exists write it to an error file
 */
Then(/^Verify if all users exist in customer list$/, async function() {
  try {
    await browser.pause(1000);
    /** 1. Navigate and select customer options from left menu */
    // @ts-ignore
    await browser.url(`${browser.config.nopCommercialBaseUrl}/Admin/Customer/List`);
    await browser.pause(2000);
    reporter.addStep(this.testid, "info", `Navigate to customer list area successfully...`);
    
    /** 2. Read API response from /data folder */
    const filename = `${process.cwd()}/data/apiResponse/responseAPIUsers.json`;
    const data = fs.readFileSync(filename, "utf8");
    const dataObject = JSON.parse(data);
  
    /** 3. For each user object in API response: */
    const testid = this.testid;
    let customerNotFound = false;
    let customerToStoreCollection = [];
    let customerToStore = {};
    let firstname = "";
    let lastname = "";
    for await(let user of dataObject.data) {
      firstname = user.first_name;
      lastname = user.last_name;
      customerNotFound = await CustomerPage.searchNameAndConfirm(testid, firstname, lastname);
      if (customerNotFound) {
        customerToStore = { firstname: firstname, lastname: lastname };
        customerToStoreCollection = [...customerToStoreCollection, customerToStore];
        console.log(customerToStore);
      }
    }
    /** 4. In case user does not exists write it to an error file */
    if (customerToStoreCollection.length) {
      const data = JSON.stringify(customerToStoreCollection);
      const filePath = `${process.cwd()}/data/apiResponse/customers.json`;
      fs.writeFileSync(filePath, data);
    }
  } catch (err) {
    err.message = `${this.testid} failed at searching users, ${err.message}`;
    throw err;
  }
});