import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
const bodyParser = require('body-parser')

import 'dotenv/config';
import { getAllPlans } from "./Plans.controller";

export const app = express();
const port = process.env.PORT || 3001;
const database = process.env.DB_URL || 'localhost:27017/subscriptions';
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => res.send('Subscription plans backend!'));
app.get('/plans', getAllPlans);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
