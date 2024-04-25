const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = 3005;
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
.then(() => console.log('connected to mongoDB'))
.catch(err => console.error('Error connecting to mongoDB:',err));
//define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const user = mongoose.model('User',userSchema);
app.get('/users', (req, res) => {
    user.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json({
        message: err.message}));
    });


app.post('/users', (req, res) => {
    const user = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(400).json({ message: err.message}));
});
app.listen(PORT);
