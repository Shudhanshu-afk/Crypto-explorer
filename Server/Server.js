const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to match your frontend's origin
    credentials: true
}));
const jwtSecret = 'huehuehue';
mongoose.connect('mongodb://127.0.0.1:27017/Chat-app')
    .then(() => {
        console.log("Connection open");
    })
    .catch((err) => {
        console.log(err);
    })
app.listen(3000, () => {
    console.log("Listening to port 3000!!");
});

const authenticate = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    coinids: {
        type: [String],
        default: []
    }

})
const User = mongoose.model('User', userSchema)
app.post('/', async (req, res) => {
    const { name, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send('Error creating user: ' + err.message);
    }
});

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, jwtSecret);

        res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });
        res.send('Logged in');
        console.log(token);
    } catch (err) {
        res.status(500).send('Error logging in: ' + err);
    }
});

app.get('/user', authenticate, async (req, res) => {
    try {

        const decode = jwt.decode(req.cookies.token);
        const user = await User.findById(decode._id);
        res.send(user);



    } catch (error) {
        console.log(error);
    }
})
app.post('/user', async (req, res) => {
    try {
        const decode = jwt.decode(req.cookies.token);
        const user = await User.findById(decode._id);
        const { coinid } = req.body;
        await User.findByIdAndUpdate(user._id, { $push: { coinids: coinid} },
            { new: true, useFindAndModify: false });
        // await update.save();


    } catch (error) {
        console.log(error);
    }
});
app.post('/delete', async (req, res) => {
    try {
        const decode = jwt.decode(req.cookies.token);
        const user = await User.findById(decode._id);
        const { coinid } = req.body;
        await User.findByIdAndUpdate(user._id, { $pull: { coinids: coinid} },
            { new: true, useFindAndModify: false });
        // await update.save();


    } catch (error) {
        console.log(error);
    }
});