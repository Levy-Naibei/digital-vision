import mongoose from 'mongoose';

const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    userEmail: String,
    name: String,
    url: String,
    summary: String,
    premiered: String,
    favorite: {
        type: Boolean,
        default: false
    },
    comment: {
        type: String,
        default: ""
    },
    image: String
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', ScheduleSchema);

export default Schedule;
