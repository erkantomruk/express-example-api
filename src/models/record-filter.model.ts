import { IsDateString, IsDefined, Matches } from "class-validator";
import { Expose } from "class-transformer";
export class RecordFilter {
    @IsDefined()
    @Matches(/\d{4}-\d{2}-\d{2}$/, { message: 'Date format should be YYYY-MM-DD' })
    @Expose()
    startDate: Date;
    @IsDefined()
    @Expose()
    @Matches(/\d{4}-\d{2}-\d{2}$/, { message: 'Date format should be YYYY-MM-DD' })
    endDate: Date;
    @IsDefined()
    @Expose()
    minCount: Number;
    @IsDefined()
    @Expose()
    maxCount: Number;

    //constructor(){}
    /*constructor(startDate: Date, endDate: Date, minCount: Number, maxCount: Number) {
        this.startDate = startDate,
        this.endDate = endDate,
        this.minCount = minCount,
        this.maxCount = maxCount
    }*/
}