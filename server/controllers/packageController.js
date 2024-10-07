const Packages = require("../models/Packages");
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',  // or any other email provider you use
  auth: {
      user: 'support@myairdeal.com', // your email address
      pass: 'bkcd hupf zdur qimw',  // your email password or an app-specific password
  },
});
// Controller to get data
exports.getData = (req, res) => {
  try {
    return res.status(200).json({ message: "Hello" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Controller to add a new package
exports.addCustomer = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, phone,email, departure, passengers, date } = req.body;
if(!name || !phone || !email ){
    return res.status(404).json({message:"missing fileds"});
}
    // Create a new package object using the model
    const newPackage = new Packages({
      name,
      phone,
      email,
      departure,
      passengers,
      date,
    });

    // Save the package to the database
    await newPackage.save();

    // Return success response
    return res.status(201).json({ message: "Package added successfully", newPackage });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllCustomers=async(req,res)=>{
    try {
        const data=await Packages.find({});
        if(!data){
            return res.status(404).json({message:"No data Found"});
        }
        return res.status(200).json({message:"Data fetched Successfully",data:data})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error"})
    }
}


/**
 * Mail
 */
exports.sendEmail= async(req, res) => {
  const { name, phone,email, passengers, departure, date } = req.body;

  const mailOptions = {
      from: email, // sender address
      to: 'satrunsince2003@gmail.com', // receiver address
      subject: 'New Booking Inquiry',
      html: `
          <h2>Booking Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong>${email}</p>
          <p><strong>Passengers:</strong> ${passengers}</p>
          <p><strong>Departure City:</strong> ${departure}</p>
          <p><strong>Date:</strong> ${date}</p>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.status(500).send({ success: false, message: 'Email not sent' });
      } else {
          // console.log('Email sent: ' + info.response);
          res.status(200).send({ success: true, message: 'Email sent successfully' });
      }
  });
};