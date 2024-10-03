const packageController=require('../controllers/packageController')
const express=require('express')
const router=express.Router()
router.get('/getallcustomer',packageController.getAllCustomers);
router.post('/addcustomer',packageController.addCustomer);
router.post('/sendmail',packageController.sendEmail)
module.exports = router;