import Page from "./page";
import chai from "chai";
import reporter from "../helper/reporter";

class NopCommerceHomePage extends Page {
    constructor() {
      super();
    }

    /** Page objects */
    get usernameInputBox() {
      return $(`[name="Email"]`);
    }
    get passwordInputBox() {
      return $(`[name="Password"]`);
    }
    get loginButton() {
      return $(`[type="submit"]`);
    }

    /** Page actions */
    async enterUsername(testid: string, username: string) {
      if(!username) {
        throw Error(`Given username ${username} is not valid`);
      }
      
      try {
        username = username.trim();
        await this.typeInto(await this.usernameInputBox, username);
        reporter.addStep(testid, "info", `Username: ${username} entered successfully`);
      } catch (err) {
        err.message = `Error entering username ${username}, ${err.message}`;
        throw err;
      }
    }
    
    async enterPassword(testid: string, password: string) {
      if(!password) {
        throw Error(`Given password is not valid`);
      }
      
      try {
        password = password.trim();
        await this.typeInto(await this.passwordInputBox, password);
        reporter.addStep(testid, "info", `Password entered successfully`);
      } catch (err) {
        err.message = `Error entering password, ${err.message}`;
        throw err;
      }
    }
    
    async clickLoginButton(testid: string) {
      try {
        await this.click(await this.loginButton);
        reporter.addStep(testid, "info", `Login successful`);
      } catch (err) {
        err.message = `Error when user click in login button, ${err.message}`;
        throw err;
      }
    }
    async loginToNopCommerce(testid: string, url: string, username: string, password: string) {
      if (!url || !username || !password) {
        throw Error(`Given data, url ${url}, username ${username} or password is invalid`);
      }
      url = url.trim();
      await this.navigateTo(url);
      try {
        await this.enterUsername(testid, username);
        await this.enterPassword(testid, password);
        await this.clickLoginButton(testid);
      } catch (err) {
        err.message = `Login to app error: testid ${testid}, username ${username}, ${err.message}`;
        throw err;
      }
    }

}
export default new NopCommerceHomePage();
