import { Document } from 'mongoose';
import request from 'supertest';
import { app } from "../src/App";
import { Plans } from "../src/Plans.model";

describe("GET /", () => {
  it("The home page for subscription plans backend", async () => {
    const result = await request(app).get("/");
    expect(result.text).toEqual("Subscription plans backend!");
    expect(result.status).toEqual(200);
  });
});

describe("GET /plans", () => {
  it("Should result in resolved list", async () => {
    const plans = [new Plans({
      code: 'gb',
      name: 'UK',
      monthlyCost: 10,
      annualCost: 50,
    })]
    // jest.spyOn(Plans, 'find').res
    jest.spyOn(Plans, 'find').mockResolvedValue(plans);

    const result = await request(app).get("/plans");
    expect(result.text).toEqual(JSON.stringify(plans));
    expect(result.status).toEqual(200);
  });
});
