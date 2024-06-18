// const express=require('express');
// const cors=require('cors');
// const mongoose=require('mongoose');
// const bodyparser=require('body-parser');
// const passport=require('passport');

// require('dotenv').config();
// const router = require('express').Router();

// const app=express();
// const port=process.env.PORT||5000;

// app.use(cors(
//     {
//     origin:['https://pocket-pal-frontend.vercel.app','https://localhost:3000'],
//      methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     optionSuccessStatus:200
// }
// ));
// app.use(bodyparser.json());
// app.use(passport.initialize());

// app.get('/',(req,res)=>{
//     res.json("Hello");
//     res.setHeader("Access-Control-Allow-Origin", "*")
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Max-Age", "1800");
// res.setHeader("Access-Control-Allow-Headers", "content-type");
// res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
// })

// require('./config/passport')(passport);

// const uri=process.env.ATLAS_URI;
// mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true ,useFindAndModify: false });
// const connection=mongoose.connection;
// connection.once('open',()=>{
//     console.log("Mongo database connection established successfully");
// });


// const usersRouter=require('./routes/users');
// app.use('/api/users',usersRouter);

// const vantageApiRouter=require('./routes/vantage-api.router');
// app.use('/api/protected/vantage-api',passport.authenticate('jwt',{session:false}),vantageApiRouter);

// const incomeRouter=require('./routes/transaction.router');
// app.use('/api/protected/income',passport.authenticate('jwt',{session:false}),incomeRouter);


// app.listen(port,()=>{
//     console.log('Server is running on port: '+port);
//     console.log('good');
// });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['https://pocket-pal-frontend.vercel.app', 'https://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.json("Hello");
});

require('./config/passport')(passport);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const vantageApiRouter = require('./routes/vantage-api.router');
app.use('/api/protected/vantage-api', passport.authenticate('jwt', { session: false }), vantageApiRouter);

const incomeRouter = require('./routes/transaction.router');
app.use('/api/protected/income', passport.authenticate('jwt', { session: false }), incomeRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});

