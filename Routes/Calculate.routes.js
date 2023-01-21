const {Router} = require('express');
const CalculateRouter = Router( );

const {CalculatorModel } = require('../Models/Calculate.model');

CalculateRouter.post('/result',async (req,res) =>{
    const {amount,interest,year} = req.body;  
   try {
    let result =  eval(Number((1 + interest ** year - 1) / interest ) * amount);
    let InvesAmt = Number(amount * year);
    let op = result - InvesAmt;
    res.send({op,result,InvesAmt})
   } catch (error) {
    res.status(400).send({"mesage" : "Something Went Wrong"})
   }
})


module.exports = {
    CalculateRouter
};