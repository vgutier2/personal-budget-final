const mongoose = require('mongoose')

const budgetForm = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('budget', budgetForm)