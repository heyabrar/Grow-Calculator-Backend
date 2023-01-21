const mongoose = require('mongoose');

const CalculatorSchema = mongoose.Schema({
    amount : Number,
    interest: Number,
    year : Number,
});

const CalculatorModel = mongoose.model('Calc', CalculatorSchema);

module.exports = {
    CalculatorModel
}