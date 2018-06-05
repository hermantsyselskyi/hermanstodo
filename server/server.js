const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tasks = require('./routes/toDo.router');

const DBURL = 'mongodb://localhost:27017/menkar_todo';

mongoose.connect(DBURL);

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo on', DBURL);
});
mongoose.connection.on('error', (error) => {
    console.log('Error connecting to Mongo', error);
});

app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/tasks', tasks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
})



// //Connect to DB w/ mongoose
// const mongoose = require('mongoose');
// const DATABASE_NAME = 'todo';
// const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
// mongoose.connect( DATABASE_URL );
// //Did mongoose connect to DB?
// mongoose.connection.on('connected', () => {
// console.log(`Mongoose is connected! ${DATABASE_URL} `);
// });//end connected
// // not connected
// mongoose.connection.on('error', (error) => {
//     console.log(`Mongoose connection error: ${error}`);
// });// end not connected
// //End of DB w/ mongoose

