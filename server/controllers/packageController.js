const Packages = require("../models/Packages");

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
    const { name, phone, departure, passengers, date } = req.body;
if(!name || !phone || !departure || !passengers || !date){
    return res.status(404).json({message:"missing fileds"});
}
    // Create a new package object using the model
    const newPackage = new Packages({
      name,
      phone,
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
