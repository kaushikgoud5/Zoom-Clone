const express = require("express");
const router = express.Router();
const {handleUserSignup,handleUserLogin}=require("../controllers/user")
const {handleCreateMeeting,fetchUpcomingMeetings, fetchPreviousMeetings}=require("../controllers/meeting")

router.post("/signup", handleUserSignup);

router.post("/login",handleUserLogin);

router.post("/create-meeting",handleCreateMeeting);

router.get("/upcoming",fetchUpcomingMeetings);

router.get("/previous",fetchPreviousMeetings);

module.exports = router;
