const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

//Database connection mongoDB
mongoose.connect("mongodb+srv://adododjialban:arnold_18@cluster2.hnhpju9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2");

// API
app.get("/", (req, res) => {
    res.send("Express app is Running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });

// Creating endpoint for images
app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating new events
const Event = mongoose.model("events", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ticket_Price: {
        type: Number,
        required: true
    },
    supportContact: {
        type: Number,
        required: false
    },
    date_event: {
        type: Date,
        required: true
    },
    ticket_Availability: {
        type: Number,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: false
    },
    timeEvent: {
        type: String,
        required: true
    },
    eventWebsite: {
        type: String,
        required: false
    }
});

// Add an event
app.post('/addevent', async (req, res) => {
    let events = await Event.find({});
    let id = events.length > 0 ? events[events.length - 1].id + 1 : 1;

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
        eventWebsite: req.body.eventWebsite
    });

    console.log(event);
    await event.save();
    console.log("Ajouter");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Delete an event
app.post('/removeevent', async (req, res) => {
    await Event.findOneAndDelete({ id: req.body.id });
    console.log("evenement supprimer");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Get all events
app.get("/allevent", async (req, res) => {
    let events = await Event.find({});
    console.log("Liste des events");
    res.send(events);
});

// Get new collection of events
app.get('/newcollection', async (req, res) => {
    let events = await Event.find({});
    let newcollection = events.slice(-8);
    console.log("c'est la nouvelle collection");
    res.send(newcollection);
});





// Schéma pour les utilisateurs
const User = mongoose.model('User', {
    firstname: {
        type: String,
        required: false,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Liste des tickets achetés (par défaut vide)
    // tickets: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Ticket' // Référence au modèle Ticket (à créer plus tard si nécessaire)
    //     }
    // ]
});


// Endpoint pour enregistrer un nouvel utilisateur
app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            error: 'Existing user found with same email',
        });
    }
    const user = new User({
        firstname:req.body.firstname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    await user.save();
    const data = {
        user: {
            id: user.id,
        },
    };
    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
});

// Endpoint pour le login de l'utilisateur
app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passMatch = req.body.password === user.password;
        if (passMatch) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "wrong password" });
        }
    } else {
        res.json({ success: false, error: "wrong email address" });
    }
});



// Email sending functionality
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email, // Remplacez par votre email
            pass: process.env.password // Remplacez par votre mot de passe
        }
    });

    const mailOptions = {
        from: email,
        to: 'adododjialban@gmail.com', // Remplacez par l'email du destinataire
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});


// endpoint pour la recherche 
app.post('/searchevents', async (req, res) => {
    let { searchTerm } = req.body;
    let events = await Event.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { organizer: { $regex: searchTerm, $options: 'i' } },
            { lieu: { $regex: searchTerm, $options: 'i' } },
            { category: { $regex: searchTerm, $options: 'i' } }
        ]
    });
    res.json(events);
});





// Start server
app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Running on port " + port);
    } else {
        console.log("error: " + error);
    }
});
