import express from "express";
import { Application } from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { DB_CONNECTION } from "./config/constants"
import { RecordController } from "./controllers/record.controller";
class App {
    public app: Application;

    public recordController: RecordController;
    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.recordController = new RecordController(this.app);
    }

    private setConfig() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(DB_CONNECTION, { useNewUrlParser: true });
    }
}
export default new App().app;