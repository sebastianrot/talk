require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000

const userRouter = require('./routes/user');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const loggedRoute = require('./routes/logged');
const photoRoute = require('./routes/photo');
const bannerRoute = require('./routes/banner');
const searchRoute = require('./routes/search');
const addpostRoute = require('./routes/addposts');
const descRoute = require('./routes/description');
const likeRoute = require('./routes/like');
const postRoute = require('./routes/post');
const followRoute = require('./routes/follow');
const commentsRoute = require('./routes/comments');
const postsRoute = require('./routes/posts');
const groupsRoute = require('./routes/groups');
const groupRoute = require('./routes/group');
const admingroupRoute = require('./routes/admingroup');
const commentRoute = require('./routes/comment')
const hotRoute = require('./routes/hot')
const photogroupRoute = require('./routes/photogroup')
const bannergroupRoute = require('./routes/bannergroup')

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

app.use('/api/user', userRouter)

app.use('/api/register', registerRoute)

app.use('/api/login', loginRoute)

app.use('/api/logout', logoutRoute)

app.use('/api/logged', loggedRoute)

app.use('/api/user', photoRoute)

app.use('/api/user', bannerRoute)

app.use('/api/search', searchRoute)

app.use('/api', addpostRoute)

app.use('/api/desc', descRoute)

app.use('/api/post', likeRoute)

app.use('/api/post', postRoute)

app.use('/api/user', followRoute)

app.use('/api/post', commentsRoute)

app.use('/api/comment', commentRoute)

app.use('/api/user', postsRoute)

app.use('/api/groups', groupsRoute)

app.use('/api/group', groupRoute)

app.use('/api/group', admingroupRoute)

app.use('/api/group', photogroupRoute)

app.use('/api/group', bannergroupRoute)

app.use('/api', hotRoute)
