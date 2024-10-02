const packageController=require('../controllers/packageController')
const express=require('express')
const router=express.Router()
router.get('/getallcustomer',packageController.getAllCustomers);
router.post('/addcustomer',packageController.addCustomer)
module.exports = router;