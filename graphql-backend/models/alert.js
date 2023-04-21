const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    alertName: {
        type: String,
        required: true,
    },
    alertDescription: {
        type: String,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'RESOLVED'],
},
});

module.exports = mongoose.model("Alert", alertSchema);