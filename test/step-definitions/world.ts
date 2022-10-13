import { setWorldConstructor } from '@cucumber/cucumber';
import { expect } from "chai";

class CustomWorld {
  testid: string;
  appid: string;
  constructor() {
    this.appid = "";
    this.testid = "";
  }
}
setWorldConstructor(CustomWorld);