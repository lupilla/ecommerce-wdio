import Page from "./page";
import reporter from "../helper/reporter";

class CustomerPage extends Page {
    constructor() {
      super();
    }

    /** Page objects */
    get firstNameInputBox() {
      return $(`#SearchFirstName`);
    }
    get lastNameInputBox() {
      return $(`#SearchLastName`);
    }
    get searchButton() {
      return $(`#search-customers`);
    }
    get noResultMessage() {
      return $(`.dataTables_empty`);
    }

    /** Page actions */
    async enterFirstname(testid: string, firstname: string) {
      if(!firstname) {
        throw Error(`Given firstname ${firstname} is not valid`);
      }
      
      try {
        firstname = firstname.trim();
        await this.typeInto(await this.firstNameInputBox, firstname);
        reporter.addStep(testid, "info", `Firstname: ${firstname} entered successfully`);
      } catch (err) {
        err.message = `Error entering firstname ${firstname}, ${err.message}`;
        throw err;
      }
    }
    
    async enterLastName(testid: string, lastname: string) {
      if(!lastname) {
        throw Error(`Given lastname is not valid`);
      }
      
      try {
        lastname = lastname.trim();
        await this.typeInto(await this.lastNameInputBox, lastname);
        reporter.addStep(testid, "info", `Lastname entered successfully`);
      } catch (err) {
        err.message = `Error entering lastname, ${err.message}`;
        throw err;
      }
    }
    
    async clickSearchButton(testid: string) {
      try {
        await this.click(await this.searchButton);
        reporter.addStep(testid, "info", `search was successful`);
      } catch (err) {
        err.message = `Error when searching user, ${err.message}`;
        throw err;
      }
    }
    async searchNameAndConfirm(testid: string, firstname: string, lastname: string): Promise<boolean> {
      if (!firstname || !lastname) {
        throw Error(`Given data, firstname ${firstname}, lastname ${lastname} to search`);
      }
      let nameNotExist = false;
      try {
        await this.enterFirstname(testid, firstname);
        await this.enterLastName(testid, lastname);
        await this.clickSearchButton(testid);
        await browser.pause(1000);
        let isNotDisplayed = await this.noResultMessage.isDisplayed();
        nameNotExist = isNotDisplayed ? true : false;
      } catch (err) {
        err.message = `Error in user search ${testid}, firstname ${firstname}, lastname ${lastname}, ${err.message}`;
        throw err;
      }
      return nameNotExist;
    }

}
export default new CustomerPage();
