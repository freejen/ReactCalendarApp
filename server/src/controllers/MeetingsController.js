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
    app.get('/users', (request, response) => {
      const controller = new MeetingsController(request, response);
      // Had to bind the function to avoid this = undefiend in Bits.
      controller.runfBitWithMongo(controller.getUsersBit.bind(controller));
    });
    
    app.get('/meetings', (request, response) => {
      const controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.getMeetingsBit.bind(controller));
    });

    app.get('/meetings/:id', (request, response) => {
      const controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.getMeetingBit.bind(controller));
    });
    
    app.get('/meetings/:id', (request, response) => {
      const controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.getMeetingBit.bind(controller));
    });

    app.post('/meetings', (request, response) => {
      const controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.postMeetingBit.bind(controller));
    });

    app.put('/meetings/:id', (request, response) => {
      const controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.putMeetingBit.bind(controller));
    });

    app.delete('/meetings/:id', (request, response) => {
      const controller = new MeetingsController(request, response);
      controller.runfBitWithMongo(controller.deleteMeetingBit.bind(controller));
    });

  }

  async runfBitWithMongo(f) {
    await this.mongoDBService.connect();
    let ret = await f();
    this.mongoDBService.disconnect();
    this.response.send(ret);
  }

  async getUsersBit() {
    return await this.mongoDBService.
      find('users');
  }

  async getMeetingsBit() {
    return await this.mongoDBService.
      find('meetings');
  }

  async getMeetingBit() {
    console.log(this.request.params.id);
    try {
      return await this.mongoDBService.
      findOne('meetings', { _id: ObjectId(this.request.params.id) });
    }
    catch (error){
      console.log(error);
      return {};
    }
  }

  async postMeetingBit() {
    return await this.mongoDBService.
      insert('meetings', {
        title: this.request.body.title,
        description: this.request.body.description,
        date: this.request.body.date,
        time: this.request.body.time,
        participants: this.request.body.participants
      });
  }

  async putMeetingBit() {
    return await this.mongoDBService.
      update('meetings', { _id: ObjectId(this.request.params.id) },
      {
        title: this.request.body.title,
        description: this.request.body.description,
        date: this.request.body.date,
        time: this.request.body.time,
        participants: this.request.body.participants
      });
  }

  async deleteMeetingBit() {
    return await this.mongoDBService.
      delete('meetings', { _id: ObjectId(this.request.params.id) } );
  }

}

module.exports = MeetingsController;
