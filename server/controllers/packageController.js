const Packages = require("../models/Packages");
const nodemailer = require('nodemailer');
const Verifier = require("email-verifier-node");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',  // or any other email provider you use
  auth: {
      user: process.env.USER, // your email address
      pass: process.env.GMAIL_APP_PASSWORD,  // your email password or an app-specific password
  },
});
// Controller to get data
// exports.getData = (req, res) => {
//   try {
//     return res.status(200).json({ message: "Hello" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// // Controller to add a new package
// exports.addCustomer = async (req, res) => {
//   try {
//     // Destructure fields from the request body
//     const { name, phone,email, departure, passengers, date } = req.body;
// if(!name || !phone || !email ){
//     return res.status(404).json({message:"missing fileds"});
// }
//     // Create a new package object using the model
//     const newPackage = new Packages({
//       name,
//       phone,
//       email,
//       departure,
//       passengers,
//       date,
//     });

//     // Save the package to the database
//     await newPackage.save();

//     // Return success response
//     return res.status(201).json({ message: "Package added successfully", newPackage });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// exports.getAllCustomers=async(req,res)=>{
//     try {
//         const data=await Packages.find({});
//         if(!data){
//             return res.status(404).json({message:"No data Found"});
//         }
//         return res.status(200).json({message:"Data fetched Successfully",data:data})
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"Server Error"})
//     }
// }


/**
 * Mail
 */
// exports.sendEmail= async(req, res) => {
//   const { name, phone,email, passengers, departure, date } = req.body;
// // console.log(email)
//   const mailOptions = {
//       from:'no-reply@myairdeal.com', // sender address
//       to: 'support@myairdeal.com', // receiver address
//       subject: 'New Booking Inquiry',
//       html: `
//           <h2>Booking Details</h2>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Email:</strong>${email}</p>
//           <p><strong>Passengers:</strong> ${passengers}</p>
//           <p><strong>Departure City:</strong> ${departure}</p>
//           <p><strong>Date:</strong> ${date}</p>
//       `,
//   };

//   const verificationResult = await Verifier.verify_email(email);
//   if (!verificationResult.is_verified) {
//     return res.status(400).json({
//       message: "The email account that you tried to reach does not exist.",
//     });
//   }
//   // console.log(mailOptions)
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           console.log(error);
//           res.status(500).send({ success: false, message: 'Email not sent' });
//       } else {
//           // console.log('Email sent: ' + info.response);
//           res.status(200).send({ success: true, message: 'Email sent successfully' });
//       }
//   });
// };

// const Packages = require("../models/Packages");
// const nodemailer = require('nodemailer');
// const Verifier = require("email-verifier-node");
// const dotenv = require("dotenv");
// dotenv.config();


exports.sendEmail = async (req, res) => {
  const { name, phone, email, passengers, departure, date } = req.body;

  // Verify the email address before sending
  try {
    const verificationResult = await Verifier.verify_email(email);
    if (!verificationResult.is_verified) {
      return res.status(400).json({
        message: "The email account you tried to reach does not exist.",
      });
    }
  } catch (verificationError) {
    console.error("Error during email verification:", verificationError);
    return res.status(500).json({ message: "Email verification failed." });
  }

  // Define email options
  const mailOptions = {
      from: 'sanjaykandula3@gmail.com', // sender address
      to: 'sanjaykandula3@gmail.com', // receiver address
      subject: 'New Booking Inquiry',
      html: `
          <h2>Booking Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Passengers:</strong> ${passengers}</p>
          <p><strong>Departure City:</strong> ${departure}</p>
          <p><strong>Date:</strong> ${date}</p>
      `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ success: false, message: 'Email not sent' });
      }
      // console.log('Email sent:', info.response);
      res.status(200).json({ success: true, message: 'Email sent successfully' });
  });
};
