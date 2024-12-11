const mongoose = require('mongoose');

const LeaveDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'employeeData', 
        required: true 
    },
    leaveType: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        default: ''
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('AppliedLeaveData', LeaveDataSchema);
