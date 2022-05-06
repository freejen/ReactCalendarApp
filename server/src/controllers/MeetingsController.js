const util = require('util');
const MongoDBService = require('../services/MongoDBService');
const ObjectId = require('mongodb').ObjectID;


class MeetingsController {
  constructor(request, response) {
    this.request = request;
    this.response = response;

    this.mongoDBService = new MongoDBService('mongodb://root:example@localhost:27017',
      'matf_lecture_08_example_03');
  }

  static registerRoutes(app) {
    app.get('/meetings', (request, response) => {
      new MeetingsController(request, response).getMeetings();
    });
  }

  async runfWithMongo(f) {
    await this.mongoDBService.connect();
    ret = f();
    this.response.send(ret);
  }

  async getMeetings() {
    // await this.mongoDBService.connect();
    this.response.send("Bla bla bla");
  }

  
}

module.exports = MeetingsController;
