const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();

//DB setup
// // prod
// mongoose.connect(config.mongoURI, { useNewUrlParser: true });

// dev
mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true }); //needed to add options for latest version
mongoose.set('useCreateIndex', true); //need this to avoid server error

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port ', port);
