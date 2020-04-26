require('dotenv').config();
require('express-async-errors');
const error = require('./middleware/error');
const config = require('config');
const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const logger = require('./logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const customers = require('./routes/customer');
const genres = require('./routes/genres');
const user = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

//check jwt privatekey exist
if(!process.env.JWT_PPRIVATE_KEY){
    console.error('FATAl ERROR: jWT PRIVATE KEY NOT DEFINE');
    process.exit(1);
}
//this is for get response as HTML
app.set('view engine','pug');

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use(compression());

//mongoDBConection
//mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGO_URI,{    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,    
})
.then(()=>{
  console.log('MongoDB connected');
})
.catch((error) => {
  console.log('MongoDB connection error: ' + error);
});

//Routers
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use(error); 

if(process.env.NODE_ENV !== 'development'){    
    app.use(morgan('tiny'));
    startupDebugger('morgan on');
}

const port = process.env.PORTS || 3000;
app.listen(port, () => { console.log(`Post lis listing ${port}`)});