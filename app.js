const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const index = require('./routes/index');
const teachers = require('./routes/teachers');
const subjects = require('./routes/subjects');
const students = require('./routes/students');

const app = express();
const sessionSettings = {
	secret: 'somethingsfishy',
  	resave: false,
  	saveUninitialized: true
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session(sessionSettings));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(3000, () => console.log('listening on port: 3000'));