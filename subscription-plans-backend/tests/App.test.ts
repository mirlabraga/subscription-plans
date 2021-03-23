import request from 'supertest';
import { app } from "../src/App";

describe("GET / - the api endpoint for home page. When the use open the applicaton in the root page.", () => {
  it("The home page for subscription plans backend", async () => {
    const result = await request(app).get("/");
    expect(result.text).toEqual("Subscription plans backend!");
    expect(result.status).toEqual(200);
  });
});
