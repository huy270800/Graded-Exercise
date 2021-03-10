

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,

        required: true
    },
    category: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deliveryType: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});
module.exports = mongoose.model('Product', productSchema);