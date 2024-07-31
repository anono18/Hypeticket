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
const User =mongoose.model('User',{
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Liste des tickets achetés (par défaut vide)
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket' // Référence au modèle Ticket (à créer plus tard si nécessaire)
        }
    ]
});


// Route pour enregistrer un nouvel utilisateur
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        let check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({
                success: false,
                error: 'Un utilisateur existe déjà avec le même email',
            });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            tickets: []
        });

        // Sauvegarder l'utilisateur dans la base de données
        await user.save();

        // Créer un jeton JWT
        const data = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(data, "secret_ecom");

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Erreur serveur' });
    }
});

// Route pour la connexion des utilisateurs
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par email
        let user = await User.findOne({ email });
        
        // Vérifier si l'utilisateur existe
        if (user) {
            // Comparer le mot de passe fourni avec le mot de passe haché stocké
            const passMatch = await bcrypt.compare(password, user.password);
            
            if (passMatch) {
                // Créer un jeton JWT si le mot de passe est correct
                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const token = jwt.sign(data, "secret_ecom", { expiresIn: '1h' }); // Jeton expirant après 1 heure
                
                // Répondre avec un succès et le jeton JWT
                res.json({ success: true, token });
            } else {
                // Répondre avec une erreur si le mot de passe est incorrect
                res.status(400).json({ success: false, error: "Mot de passe incorrect" });
            }
        } else {
            // Répondre avec une erreur si l'email est incorrect
            res.status(400).json({ success: false, error: "Adresse email incorrecte" });
        }
    } catch (error) {
        // Gérer les erreurs en renvoyant un message d'erreur
        res.status(500).json({ success: false, error: 'Erreur serveur' });
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
            {lieu: {$regex: searchTerm, $options: 'i'}},
            {category:{$regex: searchTerm, $options:'i'}}
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
