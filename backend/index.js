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

app.use(cors());

app.use(express.json());

//Database connection mongoDB
mongoose.connect("mongodb+srv://adododjialban:arnold_18@cluster2.hnhpju9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2");


// api
app.get("/", (req, res) => {
    res.send("Express app is Running")
})


// image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

// creating endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creatind new events
const Event = mongoose.model("events", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ticket_Price: {
        type: Number,
        required: true,
    },
    // contact pour plus d'info sur l'evenement
    supportContact: {
        type: Number,
        required: true,
    },
    // date de l'evenement
    date_event: {
        type: Date,
        required: true,
    },
    // nombre de ticket disponible pour l'evenement
    ticket_Availability: {
        type: Number,
        required: true,
    },
    // lieu de l'evenement 
    lieu: {
        type: String,
        required: true,
    },
    // organisateur
    organizer: {
        type: String,
        required: true,
    },
    // Utiliser le type String pour stocker l'heure au format HH:mm
    timeEvent: {
        type: String,
        required: true,
    },
    // lien vers la page web ou reseaux sociaux de l'evenement
    eventWebsite: {
        type: String,
        required: false,
    },
})

// ajouter un evenement
app.post('/addevent', async (req, res) => {
    let events = await Event.find({});
    let id;
    if (events.length > 0) {
        let last_event_array = events.slice(-1);
        let last_event = last_event_array[0];
        id = last_event.id + 1;
    } else {
        id = 1;
    }


    const event = new Event({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        description: req.body.description,
        ticket_Price: req.body.ticket_Price,
        supportContact: req.body.supportContact,
        date_event: req.body.date_event,
        ticket_Availability: req.body.ticket_Availability,
        lieu: req.body.lieu,
        organizer: req.body.organizer,
        timeEvent: req.body.timeEvent,
        eventWebsite: req.body.eventWebsite,

    });
    console.log(event);
    await event.save();
    console.log("Ajouter");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// creating api for deleting event
app.post('/removeevent',async(req, res)=>{
    await Event.findOneAndDelete({id:req.body.id});
    console.log("evenement supprimer");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// creationg api for getting all event
app.get("/allevent",async(req, res)=> {
    let events = await Event.find({});
    console.log(" Liste des products ")
    res.send(events);
})


// creating endpoint for newcollection data
app.get('/newcollection', async (req,res)=>{
    let events = await Event.find({});
    let newcollection = events.slice(1).slice(-8);
    console.log("c'est la nouvelle collection");
    res.send(newcollection);
})







app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running on port  " + port)
    } else {
        console.log("error: " + error)
    }
})