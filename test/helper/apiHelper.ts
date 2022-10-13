import request from "supertest";
import reporter from "../helper/reporter";

async function GET(testid: string, baseURL: string, endpoint: string, authToken: string, queryParam: object) {
  if (!baseURL || !endpoint) {
    throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid`);
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a GET to ${endpoint}`);
  try {
    return await request(baseURL)
      .get(endpoint)
      .query(queryParam)
      .auth(authToken, { type: 'bearer' })
      .set("Content-type", "application/json")
      .set("Accept", "application/json");
  } catch (err) {
    err.message = `Get request has failed to endpoint ${endpoint}, ${err.message}`;
    throw err;
  }
}
async function POST(testid: string, baseURL: string, endpoint: string, authToken: string, payload: object) {
  if (!baseURL || !endpoint) {
    throw Error(`One of the given values baseURL: ${baseURL}, endpoint: ${endpoint} is not valid`);
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, "info", `Making a POST to ${endpoint}`);
  try {
    return await request(baseURL)
      .post(endpoint)
      .auth(authToken, { type: 'bearer' })
      .set("Content-type", "application/json")
      .set("Accept", "application/json")
      .send(payload);
  } catch (err) {
    err.message = `Post request has failed to endpoint ${endpoint}, ${err.message}`;
    throw err;
  }
}
export default { GET, POST };
/**
baseURL: "https://reqres.in"
endpoint: "/api/users?page=2"
queryparams: {pages: 2}
 */