import { Request, Response } from "express";
import { Plans } from "./Plans.model";

export const getAllPlans = async (req: Request, res: Response) => {
  const plans = await Plans.find({});
  res.json(plans);
}
