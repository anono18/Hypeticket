<!-- HYPE-TICKET

HYPE-TICKET est un site de vente de billets en ligne pour divers événements tels que des concerts, des conférences, et des festivals. Le site comprend deux interfaces distinctes : une pour les clients et une pour les administrateurs.
Prérequis
Technologies

    Frontend : React, Tailwind CSS
    Backend : Express.js
    Base de données : MongoDBatlas

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

    Node.js
    npm

connection a la base de donné
mongoose.connect("mongodb+srv://adododjialban:arnold_18@cluster2.hnhpju9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2");


1 Installation
    Installez les dépendances backend :

    npm install
    npm install qr-image
    npm install nodemailer


2 Accédez au répertoire admin et lancez l'interface backend
    cd backend
    node index.js

3 Accédez au répertoire frontend et lancez l'interface client :
    cd frontend
    npm run dev

4 Accédez au répertoire admin et lancez l'interface administrateur :

    cd admin
    npm run dev

information sur les different endpoint du backend: 
Gestion des images
    POST /upload : Télécharge une image et renvoie son URL.

Gestion des événements

    POST /addevent : Ajoute un nouvel événement.
    POST /removeevent : Supprime un événement en utilisant son id.
    GET /allevent : Récupère la liste de tous les événements.
    GET /newcollection : Récupère les 8 derniers événements ajoutés.
    GET /event/:id/reserve : Récupère le nombre de réservations pour un événement spécifique, groupé par type de ticket.
    PUT /events/:id : Met à jour un événement en utilisant son id.
    GET /events/:eventId : Récupère les détails d'un événement spécifique.
    POST /searchevents: recherhcer un evenemnt 

Gestion des utilisateurs

    POST /signup : Crée un nouvel utilisateur avec les détails fournis.
    POST /login : Authentifie un utilisateur et renvoie un token JWT.
    GET /user/:id : (Manquant, mais mentionné comme nécessaire dans la documentation) - Récupère les détails d'un utilisateur spécifique.

Gestion des tickets

    POST /add-tickets/:eventId : Ajoute des tickets à un événement spécifique.
    GET /tickets : Récupère tous les tickets.
    GET /event/:eventId/tickets : Récupère les détails des tickets pour un événement spécifique.

Gestion des réservations

    POST /reserve : Réserve un ou plusieurs tickets pour un utilisateur. (Ce endpoint est commenté dans le code)
    GET /rev : Récupère toutes les réservations.

Statistiques de ventes

    GET /event/sales-stats : Récupère les statistiques de ventes pour les événements, y compris les événements les plus et les moins vendus.

Gestion des courriels

    POST /send-reservation-email : Envoie un email de confirmation de réservation à un utilisateur avec les détails de la réservation. (Ce endpoint est mentionné mais non complètement défini dans le code fourni.)
    /simulate-payment: stimule le payement et envoie le code qr a l'utilisateur 

Si vous avez d'autres endpoints ou des fonctionnalités spécifiques que vous souhaitez ajouter ou vérifier, n'hésitez pas à me le faire savoir ! -->
