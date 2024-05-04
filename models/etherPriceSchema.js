
const mongoose = require('mongoose')
const etherPriceSchema = new mongoose.Schema({
   
        timeStamp: {
        type: Number,
        default: Date.now, 
    },
    price: {
        type: String,
        required: true
    }
    ,
    
    
});

const EtherPrice = mongoose.model('EtherPrice', etherPriceSchema);
module.exports = EtherPrice;