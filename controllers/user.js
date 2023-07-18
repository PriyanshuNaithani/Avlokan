const Appointment = require("../models/appointment");


const appointment = async (req, res) => {
  try {
    const { date, time, day, number } = req.body;
    if (!date || !time || !day || !number) {
      return res.status(400).send({ success: false, msg: "Missing required fields." });
    }

    const appointment = new Appointment({ date, time, day, number }); 
    await appointment.save(); 

    res.status(201).send({ success: true, msg: "Appointment saved successfully." });
  } catch (error) {
    return res.status(200).send({ success: false });
  }
}

const fetchAppointmentData = async (req, res) => {
  try {
    const {number} = req.body;
    if(!number){
      return res.status(400).send({success:false, msg: "kindly fill all the entries. "})
    }

    const appointmentData =await Appointment.find({number});
    if(appointmentData.length <= 0){
      return res.status(404).send({success: false, msg: "Data not found."});
    }

    res.status(200).send({success: true, msg:"Appointment data",data:appointmentData});


  } catch (error) {
    res.status(201).send({success: false});
    console.log(error.message);
  }
}

const fetchBookingDetails = async (req, res) => {
  try {
    const {number} = req.body;
    if(!number){
      return res.status(400).send({success:false, msg: "kindly fill all the entries. "})
    }

    const bookingDetails =await Appointment.find({});
    if(bookingDetails.length <= 0){
      return res.status(404).send({success: false, msg: "Data not found."});
    }

    res.status(200).send({success: true, msg:"Booking details",data:bookingDetails});


  } catch (error) {
    res.status(201).send({success: false});
    console.log(error.message);
  }
}

const fetchDayAppointments = async (req, res) => {
  try {
    let day = req.body.day;

    day = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
    if(!day){
      return res.status(200).send({
        success: false,
        error: "Kindly fill all the entries."
      })
    } 


    const dayAppointment = await Appointment.find({day});

    if(!dayAppointment){
      return res.status(400).send({
        success: false,
        error: "Data not found"
      })    }

      res.status(200).send({
        success:true,
        data: dayAppointment
      })

  } catch (error) {
    res.status(200).send({
      result: false,
      error: error.message
    })
  }
}


const deleteAvlokan = async (req, res) => {
  try {
    const {date, time} = req.body;
    if(!date || !time){
      return res.status(200).send({
        success: false,
        error: "Kindly fill all the entries."
      })
    };

    const deletedAvlokan  = await Appointment.findOneAndDelete({date, time});
    if (!deletedAvlokan) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully.",
    });
  } catch (error) {
    res.status(200).send({
      success: false,
      error: error.message
    })
  }
}

module.exports = {
  appointment,
  fetchAppointmentData,
  fetchBookingDetails,
  fetchDayAppointments,
  deleteAvlokan

};
