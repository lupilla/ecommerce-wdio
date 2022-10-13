import { config as baseConfig } from '../wdio.conf';
const testConfig = {
  environment: "TEST",
  resqesBaseURL: "https://reqres.in",
  nopCommercialBaseUrl: "https://admin-demo.nopcommerce.com"
}
export const config = {...baseConfig, ...testConfig};