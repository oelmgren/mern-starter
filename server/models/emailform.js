import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const emailformSchema = new Schema({
    cuid: { type: 'String', required: true },
    to: { type: 'String', required: true },
    title: { type: 'String', required: true },
    body: { type: 'String', required: true }, 
    dateAdded: { type: 'Date', default: Date.now, required: true }
});

export default mongoose.model('Emailform', emailformSchema);
