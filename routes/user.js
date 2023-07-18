const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.post("/appointment",userController.appointment);
router.post("/fetchAppointmentData",userController.fetchAppointmentData);
router.post("/fetchBookingDetails",userController.fetchBookingDetails);
router.post("/fetchDayAppointments",userController.fetchDayAppointments);
router.post("/deleteAvlokan",userController.deleteAvlokan);

module.exports = router;
