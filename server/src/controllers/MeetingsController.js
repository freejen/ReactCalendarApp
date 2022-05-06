const util = require('util');
const MongoDBService = require('../services/MongoDBService');
const ObjectId = require('mongodb').ObjectID;

const DB_URL = 'mongodb+srv://sjenko:FBcqFYlFwIot7Ec3@cluster0.djdm8.mongodb.net/ReactCalendar?retryWrites=true&w=majority'

class MeetingsController {
  constructor(request, response) {
    this.request = request;
    this.response = response;

    this.mongoDBService = new MongoDBService(DB_URL, 'ReactCalendar');
  }

  static registerRoutes(app) {
    app.get('/meetings', (request, response) => {
      new MeetingsController(request, response).getMeetings();
    });

    app.get('/users', (request, response) => {
      new MeetingsController(request, response).getUsers();
    });
  }

  async runfWithMongo(f) {
    await this.mongoDBService.connect();
    ret = f();
    this.response.send(ret);
  }

  async getUsers() {
    await this.mongoDBService.connect();

    let users = await this.mongoDBService.find('users');

    this.mongoDBService.disconnect();
    this.response.send(users);
  }

  async getMeetings() {
    await this.mongoDBService.connect();

    let meetings = await this.mongoDBService.find('meetings');

    this.mongoDBService.disconnect();
    this.response.send(meetings);
  }

  
}

module.exports = MeetingsController;
