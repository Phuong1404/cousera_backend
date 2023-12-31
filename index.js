const express = require('express');
const mongoose = require('mongoose');
const BookRoutes = require('./routes/book.route');
const AuthRoutes = require('./routes/auth.route');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Cousera', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use('/api/book', BookRoutes);
app.use('/api/',AuthRoutes)

app.listen(5000, () => console.log(`Server started on port ${5000}`));