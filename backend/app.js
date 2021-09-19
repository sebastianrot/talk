require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000

const profileRouter = require('./routes/profile');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const loggedRoute = require('./routes/logged');
const addphotoRoute = require('./routes/addphoto');
const searchRoute = require('./routes/search');
const addpostRoute = require('./routes/addposts');
const descRoute = require('./routes/description');
const likeRoute = require('./routes/like');
const postRoute = require('./routes/post');
const followRoute = require('./routes/follow');
const comments = require('./routes/comments');
const postsRoute = require('./routes/posts');
const groupsRoute = require('./routes/groups');
const groupRoute = require('./routes/group');
const admingroupRoute = require('./routes/admingroup');

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

app.use('/api/user', profileRouter)

app.use('/api/register', registerRoute)

app.use('/api/login', loginRoute)

app.use('/api/logout', logoutRoute)

app.use('/api/logged', loggedRoute)

app.use('/api/addphoto', addphotoRoute)

app.use('/api/search', searchRoute)

app.use('/api/addposts', addpostRoute)

app.use('/api/desc', descRoute)

app.use('/api/post', likeRoute)

app.use('/api/post', postRoute)

app.use('/api/user', followRoute)

app.use('/api/post', comments)

app.use('/api/user', postsRoute)

app.use('/api/groups', groupsRoute)

app.use('/api/group', groupRoute)

app.use('/api/group', admingroupRoute)