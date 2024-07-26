const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");
const app = express();

app.use (cors());

app.use(express.json());

//Database connection mongoDB


//   api

app.get("/", (req, res)=>{
    res.send("Express app is Running")
})


// image storage engine
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=> {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

// creating endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req, res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})






app.listen(port, (error) =>{
    if (!error){
        console.log("Server is Running on port  " +port)
    } else{
        console.log("error: " +error)
    }
})