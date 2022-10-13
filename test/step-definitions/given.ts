import { Given } from "@cucumber/cucumber";
import reporter from "../helper/reporter";
import constants from "../../data/constants.json";
import apiHelper from "../helper/apiHelper";
import { expect } from "chai";
import fs from "fs";

/**
  * Steps:
  * 1. Get payload data
  * 2. Make get call by  using API helper
  * 3. Store results
*/
Given(/^Get a list of (.*) from reqres.in$/, async function(endpointRef) {
  let testid = this.testid;
  if (!endpointRef) {
    throw Error(`Given an endpoint ref ${endpointRef} invalid`);
  }
  try {
    /* 1. Get payload data */
    reporter.addStep(testid, "info", `Getting the payload data for endpoint: ${endpointRef}`);
    let endpoint = "";
    let response = null;
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
    if (!endpoint) {
      throw Error(`Error getting endpoint ${endpoint}`);
    }
    /* 2. Make get call by  using API helper */
    await browser.call(async function() {
      // @ts-ignore
      response = await apiHelper.GET(testid, browser.config.resqesBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM);
    });
    if (response.status !== 200) {
      // @ts-ignore
      expect.fail(`failed getting users from ${browser.config.resqesBaseURL}/${endpoint}`);
    }
    reporter.addStep(testid, "debug", `Api response received: ${JSON.stringify(response.body)}`);
    
    /* 3. Store results */
    let data = JSON.stringify(response.body, undefined, 4);
    let filename = `${process.cwd()}/data/apiResponse/responseAPIUsers.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(testid, "info", `API response from ${endpoint} stored`);
  } catch (err) {
    err.message = `${testid} the request failed, ${err.message}`;
    reporter.addStep(testid, "error", `invalid request, ${err.message}`);
    throw err;
  }
});

