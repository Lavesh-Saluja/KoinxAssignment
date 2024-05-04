const mongoose = require('mongoose')
const transactionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    transactions: [{
        timeStamp: {
        type: Number,
       required: true 
    },
    hash: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
    }],
    
    
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;