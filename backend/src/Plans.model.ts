import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PlansSchema = new Schema({
  code: String,
  name: String,
  monthlyCost: Number,
  annualCost: Number,
})

export const Plans = mongoose.model('Plans', PlansSchema);
