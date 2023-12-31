const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
    {
        name: { type: String },
        isbn: { type: String },
        author: { type: String },
        title: { type: String },
        review: { type: String },
    }
)
module.exports = mongoose.model("Book", BookSchema)