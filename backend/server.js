const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const longjohn = require('longjohn'); // Long trace stack (for async)
longjohn.async_trace_limit = 5;   // defaults to 10
longjohn.empty_frame = 'ASYNC CALLBACKS :';

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const mongoose = require("./services/db.service");
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const boardRoutes = require('./api/board/board.routes')

const connectSockets = require('./api/socket/socket.routes')

process.on('unhandledRejection', async (error) => {
    console.error(error);
});

process.on('uncaughtException', async (error) => {
    console.error(error);
    process.exit(1) //mandatory (as per the Node docs)
});

// Create a new Mongoose connection instance
mongoose.connect();

app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030', 'http://192.168.43.254:8080', 'http://192.168.43.254:3030'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)
connectSockets(io)



const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});
