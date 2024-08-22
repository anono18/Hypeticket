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



const Ticket = mongoose.model("tickets", {
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

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
    reserve: {
        type: Number
    },
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


// endpoint pour le nombre de reservation
app.get('/events/:id/reserveCount', async (req, res) => {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });
    if (!event) {
        return res.status(404).json({
            success: false,
            message: "Événement non trouvé"
        });
    }
    const reserveCount = event.reserve || 0;
    res.json({
        success: true,
        reserveCount
    });
});




// Route PUT pour mettre à jour un événement
// /api/events/:id
app.put('/events/:id', async (req, res) => {
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


app.get('/rev', async (req, res) => {
    try {
        const reservation = await Reservation.find({});
        res.json(reservation);
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
    ticketData: [{
        ticketId: {
            type: mongoose.Schema.Types.Array,
            ref: 'Ticket',
        },
    }],

});

const Reservation = mongoose.model('reservation', {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tickets',
    },
    quantity: {
        type: Number,
        required: true,
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



//endpoint pour reserver un ticket 
app.post('/reserve', fetchUser, async (req, res) => {
    const { ticketId, quantity } = req.body;
    // Log des données reçues
    console.log('ticketId:', ticketId);
    console.log('quantity:', quantity);

    // Validation des données
    if (!ticketId || !quantity || quantity <= 0) {
        console.log('Validation failed: ticketId or quantity is invalid');
        return res.status(400).send({ errors: 'TicketId et quantité sont requis et la quantité doit être positive' });
    }
    try {
        // Vérifier si le ticket existe et est disponible
        const ticket = await Ticket.findById(ticketId);
        console.log('Ticket found:', ticket);

        if (!ticket || ticket.availability < quantity) {
            console.log('Ticket non disponible ou quantité insuffisante');
            return res.status(400).send({ errors: 'Ticket non disponible ou quantité insuffisante' });
        }

        // Créer la réservation
        const reservation = new Reservation({
            user: req.user.id,
            ticket: ticketId,
            quantity: quantity,
        });

        console.log('Reservation to be saved:', reservation);

        // Mettre à jour la disponibilité du ticket
        ticket.availability -= quantity;
        console.log('Updated ticket availability:', ticket.availability);

        // Sauvegarder la réservation et le ticket
        await Promise.all([
            reservation.save(),
            ticket.save(),
        ]);

        // Extraire les détails pour ticketData
        const reservationDetails = {
            ticketId: ticket._id,
            quantity: reservation.quantity,
            type: ticket.type,
            eventDate: ticket.eventDate,
        };
        // Mettre à jour les données de l'utilisateur
        await User.findByIdAndUpdate(req.user.id, { $push: { ticketData: reservationDetails } });

        console.log('Reservation saved successfully:', reservation);
        res.status(200).send({ success: 'Réservation réussie', reservation });
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).send('Erreur du serveur');
    }
});



//endpoint pour recuperer la reservation d'un user
app.get('/myreservations', fetchUser, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id })
            .populate('ticket')
            .populate({
                path: 'ticket',
                populate: {
                    path: 'event',
                    model: 'events'
                }
            });

        if (!reservations || reservations.length === 0) {
            return res.status(404).send({ errors: 'Aucune réservation trouvée.' });
        }

        res.status(200).send(reservations);
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error.message);
        res.status(500).send({ errors: 'Erreur du serveur. Veuillez réessayer plus tard.' });
    }
});



//endpoint pour effacer une reservation
app.delete('/reservations/:id', async (req, res) => {
    try {
        const reservationId = req.params.id;

        const deletedReservation = await Reservation.findByIdAndDelete(reservationId);

        if (!deletedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reservation', error: error.message });
    }
});


//endpoint pour reccuper le nombre de ticket restant
app.get('/event/:eventId/tickets', async (req, res) => {
    try {
        const { eventId } = req.params;

        // Rechercher les tickets par ID d'événement
        const tickets = await Ticket.find({ eventId });

        if (!tickets.length) {
            return res.status(404).json({ message: 'Aucun ticket trouvé pour cet événement.' });
        }

        // Organiser les tickets par type et calculer la disponibilité totale
        const ticketDetails = tickets.reduce((acc, ticket) => {
            if (!acc[ticket.type]) {
                acc[ticket.type] = 0;
            }
            acc[ticket.type] += ticket.availability;
            return acc;
        }, {});

        res.json(ticketDetails);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tickets.', error });
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
        to: 'adododjialban@gmail.com',
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
