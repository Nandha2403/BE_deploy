const mongoose=require("mongoose")
require("dotenv").config()

// link to connect to MongoDB  = mongodb+srv://nandha:raghu@cluster0.gafymoh.mongodb.net/?retryWrites=true&w=majority

const connection=mongoose.connect(process.env.mongoUrl)

module.exports={
    connection
}