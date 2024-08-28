const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
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
        ref: 'User'
    },
    ticketNumber: {
        type: Number,
        unique: true
    }
});

// Ensure that ticketNumber is unique per type
ticketSchema.index({ type: 1, ticketNumber: 1 }, { unique: true });

ticketSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            // Find the highest ticketNumber for the same type
            const maxTicket = await this.constructor.findOne({ type: this.type }).sort({ ticketNumber: -1 });

            this.ticketNumber = maxTicket ? maxTicket.ticketNumber + 1 : 1;
            next();
        } catch (error) {
            console.error('Error generating ticket number:', error);
            next(error);
        }
    } else {
        next();
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
