import { Request, Response } from "express";
import { Record } from "../models/record.model";
import { plainToClass } from "class-transformer";
import { RecordFilter } from "../models/record-filter.model";
import { validate } from "class-validator";
import { StatusCodes } from "../config/constants"

export class RecordService {
    //Getting data from the db
    public getRecordsBetweenDates(req: Request, res: Response) {
        const request: RecordFilter = plainToClass(RecordFilter, req.body);
        validate(request, { skipMissingProperties: true }).then(errors => {
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send({
                    code: StatusCodes.FAIL,
                    msg: 'Fail',
                    errors: errorTexts
                });
                return;
            }
            else {
                return Record.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(request.startDate),
                                $lt: new Date(request.endDate)
                            }
                        }
                    },
                    {
                        $project: {
                            _id: "$id",
                            key: "$key",
                            createdAt: "$createdAt",
                            totalCount: { $sum: "$counts" },
                        }
                    },
                    {
                        $match: {
                            totalCount: {
                                $gt: request.minCount,
                                $lt: request.maxCount
                            }
                        }
                    }
                ]).exec((err, data) => {
                    if (err) {
                        res.status(500).send({
                            code: StatusCodes.DB_CONNECTION_ERROR,
                            msg: 'An unexpected error',
                            records: []
                        })
                    }
                    res.status(200).send({
                        code: StatusCodes.SUCCESS,
                        msg: 'Success',
                        records: data
                    })
                })
            }
        });
    }
}