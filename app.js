if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Increase default max listeners to prevent warning
require("events").EventEmitter.defaultMaxListeners = 20;

const express = require("express");
const session = require('express-session');
const path = require("path");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const passport = require('passport');
const methodOverride= require('method-override')
const app = express();
const bodyParser = require('body-parser');
//body-parser

app.use(express.urlencoded({extended:true}))
app.use(express.json())



const MongoStore = require('connect-mongo'); // Fix: Corrected the MongoStore import

// app.use(morgan("dev"));

//handlebar helpers
const{formatDate,stripTags,truncate, editIcon, select}= require('./helpers/hbs');


// Handlebars Setup
app.engine(".hbs", exphbs.engine({helpers:{formatDate,stripTags,truncate,editIcon, select}, defaultLayout: 'main', extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));


//passport config
require('./config/passport')(passport)


//setglobalvariable
app.use(function(req, res, next){
    res.locals.user= req.user || null
    next()
})

//session middleware
const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/storybooks',  // MongoDB connection URL
        mongooseConnection: mongoose.connection,  // Optionally use the existing mongoose connection
        ttl: 14 * 24 * 60 * 60, // optional: session expiration time (14 days in this example)
    }),
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     httpOnly: true,
    //     // secure: true, // if using https
    //     expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week expiration
    //     maxAge: 1000 * 60 * 60 * 24 * 7, // optional: set max age for the session cookie
    // }
};
app.use(session(sessionConfig));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//static
app.use(express.static(path.join(__dirname, 'public')));

// const dbUrl=`mongodb+srv://bradt1234:ranasingh@cluster0.nvsrqzl.mongodb.net/storybooks?retryWrites=true&w=majority&appName=Cluster0`

// MongoDB Connection
const dbUrl = "mongodb://127.0.0.1:27017/storybooks";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(dbUrl);
            console.log("MongoDB connected successfully");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

connectDB();
mongoose.set("strictQuery", true);

// Handle cleanup on exit
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
});

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const server = app.listen(3000, () => {
    console.log("Serving on port 3000 for storybooks");
});

process.on("exit", () => {
    server.close(() => {
        console.log("Server closed");
    });
});
