const express = require('express');
const bodyParser = require('body-parser');
const MeetingController = require('./controllers/MeetingsController');
const cors = require('cors');
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

MeetingController.registerRoutes(app);

app.listen(port, () => console.log(`API is listening on port ${ port }!`));
