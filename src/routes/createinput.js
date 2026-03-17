const express=require('express');
const inputdata=require('../controllers/inputdata');

const router=express.Router();


router.post('/createinput',inputdata);




module.exports=router;