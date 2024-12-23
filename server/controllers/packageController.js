const Packages = require("../models/Packages");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or any other email provider you use
  auth: {
    user: process.env.GMAIL_USER, // your email address
    pass: process.env.GMAIL_APP_PASSWORD,  // your email password or an app-specific password
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
    const { name, phone, email, departure, passengers, date } = req.body;
    if (!name || !phone || !email) {
      return res.status(404).json({ message: "missing fileds" });
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

exports.getAllCustomers = async (req, res) => {
  try {
    const data = await Packages.find({});
    if (!data) {
      return res.status(404).json({ message: "No data Found" });
    }
    return res.status(200).json({ message: "Data fetched Successfully", data: data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" })
  }
}


/**
 * Mail
 */
exports.sendEmail= async(req, res) => {
  const { name, phone,email, pax, origin, date , packageName } = req.body;
  const formatedPackage=packageName && packageName.length > 0 ? packageName : "Interested"
// console.log(email)
  const mailOptions = {
      from:'no-reply@gmail.com', // sender address
      to: 'support@myairdeal.com', // receiver address
      subject: 'New Booking Inquiry',
      html: `
          <h2>Package Booking Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong>${email}</p>
          <p><strong>Pax:</strong> ${pax}</p>
          <p><strong>Origin City:</strong> ${origin}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Package Searched For:</strong>${formatedPackage}</p>
      `,
  };
  // console.log(mailOptions)
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
/**
 * Umrah mail api
 */
exports.umrahMail = async (req, res) => {
  try {
    const { name, email, phone, origin, pax, message } = req.body;

    const mailOptions = {
      from: "no-reply@gmail.com",
      to: "support@myairdeal.com",
      subject: "Umrah Package Booking",
      html: `
        <h1>Umrah Booking Enquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Origin:</strong> ${origin}</p>
        <p><strong>Pax:</strong> ${pax}</p>
        <p><strong>Message:</strong> ${message}</p>`,
    };

    // Send the email and wait for confirmation
    const info = await transporter.sendMail(mailOptions);

    // Log the info for debugging
    // console.log("Email sent:", info.response);
    return res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
};