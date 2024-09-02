const port = 4000;
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const axios = require('axios');
// const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const qr = require('qr-image');
const fs = require('fs');
// const bcrypt = require('bcrypt');
require('dotenv').config();
const bcrypt = require('bcryptjs');






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
// app.get('/events/:id/reserveCount', async (req, res) => {
//     const { id } = req.params;
//     const event = await Event.findOne({ _id: id });
//     if (!event) {
//         return res.status(404).json({
//             success: false,
//             message: "Événement non trouvé"
//         });
//     }
//     const reserveCount = event.reserve || 0;
//     res.json({
//         success: true,
//         reserveCount
//     });
// });
// app.get('/event/:eventId/reserve', async (req, res) => {
//     const { eventId } = req.params;

//     try {
//         // Recherche de l'événement par ID
//         const event = await Event.findById(eventId);
//         // Vérifier si l'événement existe
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }
//         // Récupérer et retourner l'attribut `reserve`
//         const reserve = event.reserve || 0; // Si `reserve` est indéfini, retourner 0
//         console.log(reserve);

//         res.json({ eventId: eventId, reserve: reserve });
//         console.log( eventId,reserve);
//     } catch (error) {
//         console.error('Error retrieving event reserve:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.get('/event/:id/reserve', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findOne({ id: parseInt(id) }); // Assurez-vous que `id` est converti en nombre si nécessaire
        // Vérifier si l'événement existe
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const tickets = await Ticket.find({ eventId: event.id, reserved: true }); // Utiliser `event.id` pour correspondre au champ des tickets

        // Compter les tickets réservés par type
        const reserveCount = tickets.reduce((acc, ticket) => {
            const type = ticket.type || 'Unknown'; // Utiliser 'Unknown' si le type n'est pas défini
            if (!acc[type]) {
                acc[type] = 0;
            }
            acc[type]++;
            return acc;
        }, {});

        res.json({ eventId: id, reserve: reserveCount });
    } catch (error) {
        console.error('Error retrieving event reserve:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// statistique
app.get('/event/sales-stats', async (req, res) => {
    try {
        const salesData = await Ticket.aggregate([
            { $match: { reserved: true } },
            { $group: { _id: '$event', totalSold: { $sum: 1 } } },
            { $lookup: {
                from: 'events',
                localField: '_id',
                foreignField: '_id',
                as: 'eventDetails'
            }},
            { $unwind: '$eventDetails' },
            { $project: {
                _id: 0,
                name: '$eventDetails.name',
                ticketsSold: '$totalSold'
            }},
            { $sort: { ticketsSold: -1 } }
        ]);

        console.log('Sales Data:', salesData);

        const mostSold = salesData[0] || {};
        const leastSold = salesData[salesData.length - 1] || {};

        res.json({
            mostSold,
            leastSold,
            allEvents: salesData
        });
    } catch (error) {
        console.error('Error fetching event sales stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
    paymentMethod: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    }

});



app.post('/signup', async (req, res) => {
    const { firstname, name, email, password, phoneNumber, paymentMethod } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        // Hacher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur
        user = new User({
            firstname,
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            paymentMethod
        });

        await user.save();

        // Générer un token JWT
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, "secret_ecom", { expiresIn: '1h' });

        res.status(201).json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }

        // Comparer le mot de passe fourni avec le mot de passe stocké
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }

        // Générer un token JWT
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, "secret_ecom");

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});


const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, error: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, "secret_ecom");
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ success: false, error: "Token is not valid" });
    }
};


//**************************************************************tout concernant les ticket ******************************************************

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

    },
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

// app.post('/add-tickets/:eventId', async (req, res) => {
//     const { eventId } = req.params;
//     const { tickets } = req.body; // tickets devrait être un tableau de tickets

//     // Log les données reçues pour le débogage
//     console.log('Received data:', req.body);

//     try {
//         // Vérifier que l'événement existe
//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ message: 'Événement non trouvé' });
//         }

//         // Vérifiez le format des données des tickets
//         if (!Array.isArray(tickets) || tickets.some(ticket => !ticket.type || !ticket.price || !ticket.availability)) {
//             return res.status(400).json({ message: 'Données des tickets invalides' });
//         }

//         // Créer et sauvegarder les tickets
//         const createdTickets = await Promise.all(tickets.map(async (ticket) => {
//             // Créer un nouveau ticket avec l'événement et le numéro de ticket
//             const newTicket = new Ticket({
//                 ...ticket,
//                 event: eventId
//             });
//             return newTicket.save();
//         }));

//         res.status(201).json({
//             message: 'Tickets ajoutés avec succès',
//             tickets: createdTickets
//         });
//     } catch (error) {
//         // Log l'erreur pour le débogage
//         console.error('Erreur lors de l\'ajout des tickets:', error);
//         res.status(500).json({ error: error.message });
//     }
// });


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





// app.get('/event/:eventId/tickets', async (req, res) => {
//     try {
//         const eventId = req.params.eventId;
//         const tickets = await Ticket.find({ eventId });

//         if (!tickets || tickets.length === 0) {
//             return res.status(404).send({ error: 'Aucun ticket trouvé pour cet événement' });
//         }

//         const ticketDetails = tickets.reduce((acc, ticket) => {
//             acc[ticket.type] = ticket.availability;
//             return acc;
//         }, {});

//         res.status(200).json(ticketDetails);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des tickets:', error.message);
//         res.status(500).send('Erreur du serveur');
//     }
// });


// app.get('/event/:eventId/tickets', async (req, res) => {
//     try {
//         console.log("en cours")
//         const eventId = req.params.eventId;
//         const tickets = await Ticket.find({ event: eventId });

//         console.log(tickets)
//         if (!tickets || tickets.length === 0) {
//             return res.status(404).json({ error: 'Aucun ticket trouvé pour cet événement' });
//         }

//         const ticketDetails = tickets.reduce((acc, ticket) => {
//             acc[ticket.type] = ticket.availability;
//             return acc;
//         }, {});

//         res.status(200).json(ticketDetails);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des tickets:', error.message);
//         res.status(500).json({ error: 'Erreur du serveur' });
//     }
// });


app.get('/event/:eventId/tickets', async (req, res) => {
    try {
        console.log("En cours de traitement");
        const eventId = req.params.eventId;
        const tickets = await Ticket.find({ event: eventId });

        console.log("Tickets trouvés :", tickets);
        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ error: 'Aucun ticket trouvé pour cet événement' });
        }

        // Assurez-vous que le type est bien représenté
        const ticketDetails = tickets.reduce((acc, ticket) => {
            acc[ticket.type] = ticket.availability;
            return acc;
        }, {});

        res.status(200).json(ticketDetails);
    } catch (error) {
        console.error('Erreur lors de la récupération des tickets :', error.message);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
});







//*******************************************************************RESERVATION******************************************************

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









//*************************************************************Endpoint pour le payement***********************************

// app.post('/simulate-payment', fetchUser, async (req, res) => {
//     const { eventId, ticketDetails, securityCode, paymentMethod, phoneNumber } = req.body;

//     if (!req.user) {
//         return res.status(401).json({ message: 'User not authenticated' });
//     }

//     try {
//         const event = await Event.findById(eventId ,
//             { $inc: { reserve: detail.quantity } },
//             { new: true });
//         if (!event) {
//             return res.status(404).json({ message: 'Event not found' });
//         }

        
//         const tickets = await Ticket.find({ event: eventId });
//         if (!tickets.length) {
//             return res.status(404).json({ message: 'No tickets found for this event' });
//         }

//         let totalPrice = 0;
//         for (const detail of ticketDetails) {
//             const ticket = tickets.find(ticket => ticket._id.toString() === detail.ticketId);
//             if (ticket) {
//                 totalPrice += ticket.price * detail.quantity;
//             } else {
//                 return res.status(404).json({ message: `Ticket with ID ${detail.ticketId} not found` });
//             }
//         }

//         if (req.body.amount !== totalPrice) {
//             return res.status(400).json({ message: 'Amount does not match the total price for the quantity of tickets' });
//         }

//         if (securityCode !== '1234') {
//             return res.status(400).json({ message: 'Invalid security code' });
//         }

//         const isTMoney = ['90', '91', '92', '93', '70', '71'].some(prefix => phoneNumber.startsWith(prefix));
//         const isFlooz = ['96', '97', '98', '99', '79'].some(prefix => phoneNumber.startsWith(prefix));

//         if (paymentMethod === 'TMoney' && !isTMoney) {
//             return res.status(400).json({ message: 'Invalid phone number for TMoney' });
//         } else if (paymentMethod === 'Flooz' && !isFlooz) {
//             return res.status(400).json({ message: 'Invalid phone number for Flooz' });
//         }

//         // Create PDFs for each ticket detail
//         const pdfPaths = [];
//         for (const detail of ticketDetails) {
//             const ticket = tickets.find(ticket => ticket._id.toString() === detail.ticketId);
//             if (ticket) {
//                 for (let i = 0; i < detail.quantity; i++) {
//                     const qrCodeData = `
//                     ${ticket._id}
//                     Ticket Number: ${i + 1}
//                     Event: ${event.name}
//                     Ticket Type: ${ticket.type}
//                     Price: ${ticket.price}
//                     `;
                    
//                     const qrCodeBuffer = await generateQRCode(qrCodeData);
                    
//                     // Generate a unique PDF for each QR code
//                     const pdfPath = path.join(__dirname, `ticket-${i + 1}.pdf`);
//                     await createPDFWithQRCode(qrCodeBuffer, pdfPath);
                    
//                     pdfPaths.push(pdfPath);
//                 }
//             }
//         }

//         // Get user email
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Send all PDFs by email
//         await Promise.all(pdfPaths.map(async (pdfPath) => {
//             await sendQRCodeByEmail(user.email, pdfPath);
//         }));

//         res.json({ message: 'Payment successful! QR codes have been sent.' });
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.post('/simulate-payment', fetchUser, async (req, res) => {
    const { eventId, ticketDetails, securityCode, paymentMethod, phoneNumber } = req.body;
    

    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const tickets = await Ticket.find({ event: eventId });
        if (!tickets.length) {
            return res.status(404).json({ message: 'No tickets found for this event' });
        }

        let totalPrice = 0;
        let totalQuantity = 0;  

        for (const detail of ticketDetails) {
            const ticket = tickets.find(ticket => ticket._id.toString() === detail.ticketId);
            if (ticket) {
                totalPrice += ticket.price * detail.quantity;
                totalQuantity += detail.quantity;
            } else {
                return res.status(404).json({ message: `Ticket with ID ${detail.ticketId} not found` });
            }
        }

        if (req.body.amount !== totalPrice) {
            return res.status(400).json({ message: 'Amount does not match the total price for the quantity of tickets' });
        }

        if (securityCode !== '1234') {
            return res.status(400).json({ message: 'Invalid security code' });
        }

        const isTMoney = ['90', '91', '92', '93', '70', '71'].some(prefix => phoneNumber.startsWith(prefix));
        const isFlooz = ['96', '97', '98', '99', '79'].some(prefix => phoneNumber.startsWith(prefix));

        if (paymentMethod === 'TMoney' && !isTMoney) {
            return res.status(400).json({ message: 'Invalid phone number for TMoney' });
        } else if (paymentMethod === 'Flooz' && !isFlooz) {
            return res.status(400).json({ message: 'Invalid phone number for Flooz' });
        }

        // Incrémentez `reserve` par la quantité totale de tickets achetés
        event.reserve = (event.reserve || 0) + totalQuantity;
        await event.save();
        console.log(eventId,event.reserve);

        // Create PDFs for each ticket detail
        const pdfPaths = [];
        for (const detail of ticketDetails) {
            const ticket = tickets.find(ticket => ticket._id.toString() === detail.ticketId);
            if (ticket) {
                for (let i = 0; i < detail.quantity; i++) {
                    const qrCodeData = `
                    ${ticket._id}
                    Ticket Number: ${i + 1}
                    Event: ${event.name}
                    Ticket Type: ${ticket.type}
                    Price: ${ticket.price}
                    `;
                    
                    const qrCodeBuffer = await generateQRCode(qrCodeData);
                    
                    // Generate a unique PDF for each QR code
                    const pdfPath = path.join(__dirname, `ticket-${i + 1}.pdf`);
                    await createPDFWithQRCode(qrCodeBuffer, pdfPath);
                    
                    pdfPaths.push(pdfPath);
                }
            }
        }

        // Get user email
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send all PDFs by email
        await sendQRCodeByEmail(user.email, pdfPaths);

        res.json({ message: 'Payment successful! QR codes have been sent.' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

async function generateQRCode(data) {
    try {
        return qr.imageSync(data, { type: 'png' });
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}
// async function createPDFWithQRCode(qrCodeBuffer, outputPath) {
//     try {
//         const doc = new PDFDocument();
//         doc.pipe(fs.createWriteStream(outputPath));

//         doc.fontSize(12).text(`Merci pour votre achat ; voici votre billet pour l'evenement. faite le scanner pour avoir acces a l'evenement`, {
//             align: 'center'
//         });

//         doc.image(qrCodeBuffer, {
//             fit: [250, 250],
//             align: 'center',
//             valign: 'center'
//         });

//         doc.end();
//         console.log('PDF created successfully:', outputPath);
//     } catch (error) {
//         console.error('Error creating PDF:', error);
//         throw error;
//     }
// }
async function createPDFWithQRCode(qrCodeBuffer, outputPath) {
    try {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        doc.fontSize(12).text(`Merci pour votre achat ; voici votre billet pour l'événement. Faites-le scanner pour accéder à l'événement.`, {
            align: 'center'
        });

        doc.image(qrCodeBuffer, {
            fit: [250, 250],
            align: 'center',
            valign: 'center'
        });

        doc.end();

        // Attendre la fin du flux avant de continuer
        await new Promise((resolve, reject) => {
            stream.on('finish', resolve); // Le flux est terminé
            stream.on('error', reject); // Une erreur s'est produite
        });

        console.log('PDF created successfully:', outputPath);
    } catch (error) {
        console.error('Error creating PDF:', error);
        throw error;
    }
}


async function sendQRCodeByEmail(email, pdfPaths) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adododjialban@gmail.com',
            pass: 'hulx sonc faua wwgd'
        }
    });

    const attachments = pdfPaths.map((pdfPath, index) => ({
        filename: `ticket-${index + 1}.pdf`,
        path: pdfPath
    }));

    const mailOptions = {
        from: 'adododjialban@gmail.com',
        to: email,
        subject: 'Your Ticket QR Codes',
        text: 'Thank you for your purchase! Please find your QR codes attached.',
        attachments: attachments
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('QR codes sent successfully to', email);
    } catch (error) {
        console.error('Error sending QR codes:', error);
        throw error;
    }
}








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