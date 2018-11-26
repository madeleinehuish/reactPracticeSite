const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

if(process.env.NODE_ENV === 'production') {
	// production
	mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
} else {
	// development
	mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true }); //needed to add options for latest version
}

mongoose.set('useCreateIndex', true); //need this to avoid server error

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

if (process.env.NODE_ENV === 'production') {
	//express will serve up production assets like our main.js or main.css file
	app.use(express.static('client/build'));

	//express will serve up the index.html file if it doesn't recognize the route
	app.get('/', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port ', port);
