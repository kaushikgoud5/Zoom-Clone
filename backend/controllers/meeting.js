const Meeting  = require("../models/meeting");

async function handleCreateMeeting(req,res){
    const meeting = new Meeting(req.body);
    await meeting.save();
    return res.json({message:"Meeting created successfully",link:meeting.meetingLink})
}

async function fetchUpcomingMeetings(req,res) {
    const date = new Date();
    const meetings = await Meeting.find({time:{$gte:date}}).sort({time:1});
    res.json(meetings); 
}
async function fetchPreviousMeetings(req,res) {
    const date = new Date();
    const meetings = await Meeting.find({time:{$lte:date}}).sort({time:1});
    res.json(meetings); 
}
module.exports = {
    handleCreateMeeting,
    fetchUpcomingMeetings,
    fetchPreviousMeetings
}