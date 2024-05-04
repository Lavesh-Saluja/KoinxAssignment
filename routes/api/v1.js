const express = require('express');
const router = express.Router();
const { z } = require('zod');
const axios = require('axios');
const Transaction = require("../../models/transactionSchema");
require("../../db/connection")
const AddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
const {getCachedPrice} = require('../../scheduler/etherPriceSchedule')
router.get("/transactions", async(req, res) => {
   try{ 
    const address = AddressSchema.parse(req.body.address);
    const url=`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&apikey=${process.env.ETH_SCAN_API_KEY}`
    
       let result = await axios.get(url);
       result = await result.data.result;
       result = result.map((txn) => {
           if(txn.isError==="0" && txn.txreceipt_status==='1')
           return {
                timeStamp: txn.timeStamp,
        hash: txn.hash,
        from: txn.from,
        to: txn.to,
        value: txn.value
           }
       });
        await Transaction.insertMany({user:address,transactions:result});
       console.log(result);
       //get all the transactions from ++
       res.send(result)
   }
   catch (e) {
       console.error(e);
    }

});
router.get("/getBalance", async (req, res) => {
   try{ const address = AddressSchema.parse(req.body.address);
    const user = await Transaction.findOne({ user: address }).exec();
    if (!user) {
        return res.status(404).json({ error: "No transactions found for the user" });
    }
let totalWei = BigInt(0);
       const weiValues = user.transactions; // Example wei values in string format
       let cnt = 0;
       for (const txn of weiValues) {
           if (txn.to === address)
           {
               totalWei += BigInt(txn.value);
        }
           else 
           {
               cnt++;
             totalWei -= BigInt(txn.value);
               }
       }
        // Convert total wei to ether
       const totalEther = totalWei.toString();
       // getting ethereum latest price
       let price = await getCachedPrice();
       res.send({balance:totalEther,etherPrice:price});
   }
   catch (e) {
       console.error(e);
       res.status(500).json({ error: "Error" });
    }
})
module.exports = router;