require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000

const myProfileRouter = require('./routes/myProfile');
const profileRouter = require('./routes/profile');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const loggedRoute = require('./routes/logged');
const addPhotoRoute = require('./routes/addPhoto')

app.use('/static', express.static('public'))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST']
}))
app.use(cookieParser())
app.disable('x-powered-by');  

app.listen(PORT)

app.use('/api/myprofile', myProfileRouter)

app.use('/api/profile', profileRouter)

app.use('/api/register', registerRoute)

app.use('/api/login', loginRoute)

app.use('/api/logout', logoutRoute)

app.use('/api/logged', loggedRoute)

app.use('/api/addphoto', addPhotoRoute)


