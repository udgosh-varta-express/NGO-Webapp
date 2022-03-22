const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hemantdb").then(()=>{
    console.log('Connection Succesful');
}).catch(()=>{
    console.log('no Connection');
})


