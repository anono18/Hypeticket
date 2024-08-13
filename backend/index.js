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

// Database connection mongoDB
mongoose.connect("mongodb+srv://adododjialban:arnold_18@cluster2.hnhpju9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2");

// API
app.get("/", (req, res) => {
    res.send("Express app is Running");
});

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
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



const Ticket = mongoose.model("tickets",{
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: Number,
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    }
});

//***************************************************tous concernant les evnements*********************************************

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
    supportContact: {
        type: Number,
        required: false
    },
    date_event: {
        type: Date,
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
    },
    reserve:{
        type:Number
    },
    // tickets: [
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'tickets'}
    // ]
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
            tickets: req.body.tickets, 
            supportContact: req.body.supportContact,
            date_event: req.body.date_event,
            lieu: req.body.lieu,
            organizer: req.body.organizer,
            timeEvent: req.body.timeEvent,
            eventWebsite: req.body.eventWebsite,
            reserve: 0
    });

    await event.save();
    console.log("evenement ajouter");
    res.json({
        success: true,
        name: req.body.name,
        eventId: event._id
    });
});


// Delete an event
app.post('/removeevent', async (req, res) => {
    await Event.findOneAndDelete({ id: req.body.id });
    console.log("événement supprimé");
    res.json({
        success: true,
        name: req.body.name
    });
});

// Get all events
app.get("/allevent", async (req, res) => {
    let events = await Event.find({});
    console.log("Liste des événements");
    res.send(events);
});

// Get new collection of events
app.get('/newcollection', async (req, res) => {
    let events = await Event.find({});
    let newcollection = events.slice(-8);
    console.log("c'est la nouvelle collection");
    res.send(newcollection);
});

// Route PUT pour mettre à jour un événement
// /api/events/:id
app.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const event = await Event.findOneAndUpdate({ id: parseInt(id) }, updatedData, { new: true });

        if (!event) {
            return res.status(404).json({ error: 'Événement non trouvé' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'événement' });
    }
});



// Ajouter des tickets à un événement
app.post('/add-tickets/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const { tickets } = req.body; // tickets devrait être un tableau de tickets

    try {
        // Vérifier que l'événement existe
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        // Créer et sauvegarder les tickets
        const createdTickets = await Promise.all(tickets.map(ticket => {
            const newTicket = new Ticket({ ...ticket, event: eventId });
            return newTicket.save();
        }));

        res.status(201).json({ 
            message: 'Tickets ajoutés avec succès',
            tickets: createdTickets 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// endpoint pour récupérer tous les tickets associés à un événement spécifique
app.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.json(tickets);
    } catch (error) {
        console.error('Erreur lors de la récupération des tickets:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des tickets' });
    }
});





//********************************************tous concernant les utilisateur ********************************************

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
    ticketData: {
        type: Object,
        default: {}, 
    },
});


// Endpoint pour enregistrer un nouvel utilisateur
app.post('/signup', async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            error: 'Un utilisateur avec cet email existe déjà',
        });
    }
    const user = new User({
        firstname: req.body.firstname,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        ticketData: {}, // Initialise ticketData comme un objet vide
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
            res.json({ success: false, error: "Mot de passe incorrect" });
        }
    } else {
        res.json({ success: false, error: "Adresse email incorrecte" });
    }
});







// le middleware de verification de connection
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: 'Please authenticate using a valid login' });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom'); 
        req.user = data.user; 
        next(); 
    } catch (error) {
        res.status(401).send({ errors: 'Please authenticate using a valid token' });
    }
};



// endpoint pour reserver un ticket 
app.post('/addTicketToCart', fetchUser, async (req, res) => {
    try {
        const { ticketId, quantity } = req.body;

        // Récupère les données de l'utilisateur
        let userData = await User.findOne({ _id: req.user.id });
        // Vérifie si le ticket existe déjà dans ticketData
        if (!userData.ticketData[ticketId]) {
            userData.ticketData[ticketId] = 0; // Initialise si le ticket n'existe pas encore
        }
        // Met à jour la quantité de tickets pour cet événement
        userData.ticketData[ticketId] += quantity;
        // Met à jour les données de l'utilisateur avec les nouveaux tickets
        await User.findOneAndUpdate(
            { _id: req.user.id },
            { ticketData: userData.ticketData }
        );

        res.send('Ticket added to cart');
    } catch (error) {
        console.error("Erreur lors de l'ajout du ticket au panier :", error);
        res.status(500).json({
            success: false,
            message: "Une erreur s'est produite lors de l'ajout du ticket au panier"
        });
    }
});

// endpoint pour recuperer les reservation par un client 
app.get('/myReservations', fetchUser, async (req, res) => {
    try {
        // Récupérer les données de l'utilisateur
        let userData = await User.findOne({ _id: req.user.id }).populate({
            path: 'ticketData.ticketId',
            populate: {
                path: 'event', // Remplir l'information de l'événement
                model: 'events'
            }
        });

        // Récupérer les détails des tickets
        const tickets = Object.keys(userData.ticketData).map(ticketId => ({
            eventImage: userData.ticketData[ticketId].event.image,
            eventName: userData.ticketData[ticketId].event.name,
            ticketType: userData.ticketData[ticketId].type,
            quantity: userData.ticketData[ticketId].quantity,
            status: 'réservé', // ou 'payé' selon votre logique
            id: ticketId
        }));

        res.json({ success: true, tickets });
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
        res.status(500).json({
            success: false,
            message: "Une erreur s'est produite lors de la récupération des réservations"
        });
    }
});








//*********************************************************endpoint pour faire l'email****************************************
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: 'adododjialban@gmail.com', // L'email de l'administrateur
        subject: subject,
        text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email envoyé avec succès' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
    }
});


//***************************************************************Endpoint pour la recherche*******************************
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
