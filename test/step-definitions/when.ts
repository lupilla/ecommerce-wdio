import { When } from "@cucumber/cucumber";
import reporter from "../helper/reporter";
import NopCommerceHomePage from "../page-objects/nopcommerce.home.page";

When(/^as (a|an) (.*) user login to nopcommerce site$/, async function(userprefix, typeOfUser) {
  if(!typeOfUser) {
    throw Error(`Invalid user ${typeOfUser}`);
  }
  const user = typeOfUser.trim().toUpperCase();
  try {
    reporter.addStep(this.testid, "info", "Login to nop commerce demo site...");
    // @ts-ignore
    await NopCommerceHomePage.loginToNopCommerce(
      this.testid,
      // @ts-ignore
      browser.config.nopCommercialBaseUrl, 
      process.env[`TEST_NOP_${user}_USERNAME`], 
      process.env[`TEST_NOP_${user}_PASSWORD`]);
  } catch (err) {
    err.message = `${this.testid} Failed login step, ${err.message}`;
  }
}); 
