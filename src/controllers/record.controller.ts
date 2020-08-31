import { Application } from 'express';
import { RecordService } from "../services/record.service";
export class RecordController {
    private recordService: RecordService;

    constructor(private app: Application) {
        this.recordService = new RecordService(); this.routes();
    }
    public routes() {
        this.app.route("/records").post(this.recordService.getRecordsBetweenDates);
    }
}