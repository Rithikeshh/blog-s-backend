const mongoose = require("mongoose")

mongoose.connect(process.env.DATA_BASE_URL)
.then(()=>{
    console.log("Connection to database successful");
})
.catch((error)=>{
    console.log(`Failed to connect to database: ${error}`)
})