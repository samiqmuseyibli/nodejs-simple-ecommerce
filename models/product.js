const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you must enter a product name'],
        minlength: [5, 'You must enter a minimum of 5 characters for the product name.'],
        maxlength: [255, 'You must enter a maximum of 255 characters for the product name.'],
        lowercase: true,
        // uppercase: true
        trim: true
    },
    price: {
        type: Number,
        required: function () {
            return this.isActive;
        },
        min: 0,
        max: 10000,
        get: value => Math.round(value), //10.2 => 10 10.8=> 11
        set: value => Math.round(value)  // 10.2 => 10 10.8=>11
    },
    description: {
        type: String,
        minlength: 10
    },
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value && value.length > 0;
            },
            message: 'enter at least one tag for the product'
        }
    },
    isActive: Boolean,
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: false
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);