const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    title : {type:String,required:true},
    description: {type:String,required:true},
    time : {type:Date,required:true},
    meetingLink:{type:String,required:true},
})

const Meeting = mongoose.model('Meeting',meetingSchema);
module.exports = Meeting;   