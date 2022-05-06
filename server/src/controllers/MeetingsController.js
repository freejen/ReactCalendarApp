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
      let controller = new MeetingsController(request, response);
      // Had to bind the function to avoid this = undefiend in Bits.
      controller.runfBitWithMongo(controller.getMeetingsBit.bind(controller));
    });

    app.get('/users', (request, response) => {
      let controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.getUsersBit.bind(controller));
    });
  }

  async runfBitWithMongo(f) {
    await this.mongoDBService.connect();
    let ret = await f();
    this.mongoDBService.disconnect();
    this.response.send(ret);
  }

  async getUsersBit() {
    return await this.mongoDBService.find('users');
  }

  async getMeetingsBit() {
    return await this.mongoDBService.find('meetings');
  }

  
}

module.exports = MeetingsController;
