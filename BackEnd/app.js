const express = require('express'); // Express Framework
const errorHandler = require('./middlewares/errorHandler'); // here will be your error handler
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routers/authRoutes');

// create server
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// middleware converts incoming json body data to js object and puts it to req.body
app.use(express.json());

// middleware for parsing cookies
app.use(cookieParser());

// here will be your routes
app.use("/api/v1/users", authRouter)


app.use(errorHandler); // middleware for handling errors of each route

module.exports = app;
