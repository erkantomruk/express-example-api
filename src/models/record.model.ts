import mongoose from "mongoose";
const RecordSchema = new mongoose.Schema({
    _id: String,
    key: String,
    createdAt: Date,
    counts: Array<Number>()
});

export const Record = mongoose.model("Record", RecordSchema);