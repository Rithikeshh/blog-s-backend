const app = require("./app")
const dotEnv = require("dotenv");
dotEnv.config();
require("./connectDB")

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})