const mongoose = require('mongoose');

const CalculatorSchema = mongoose.Schema({
    amount : String,
    interest: String,
    year : String,
});

const CalculatorModel = mongoose.model('Calc', CalculatorSchema);

module.exports = {
    CalculatorModel
}