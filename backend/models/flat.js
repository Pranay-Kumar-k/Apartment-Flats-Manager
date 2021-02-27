const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flatSchema = new Schema(
    {
        id: {
            type:Number,
            required: true,
            unique: true
        },
        flat_name: {
            type:String,
            required:true,
        },
        flat_type: {
            type:String,
            required:true,
        },
        residents: {
            type:Object,
            required:true
        }
    },
    {
        versionKey:false,
    }
);

module.exports = mongoose.model("flat", flatSchema)