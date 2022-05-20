const MongoDBService = require("../services/MongoDBService");
const ObjectId = require("mongodb").ObjectId;

const DB_URL =
  "mongodb+srv://sjenko:FBcqFYlFwIot7Ec3@cluster0.djdm8.mongodb.net/ReactCalendar?retryWrites=true&w=majority";

class Controller {
  constructor() {
    this.mongoDBService = new MongoDBService(DB_URL, "ReactCalendar");
  }

  async runfBitWithMongo(f) {
    await this.mongoDBService.connect();
    let ret = await f();
    this.mongoDBService.disconnect();
    return ret;
  }

  async getUsersBit() {
    return await this.mongoDBService.find("users");
  }

  async getUsers(request, response) {
    response.send(await this.runfBitWithMongo(this.getUsersBit.bind(this)));
  }

  async getMeetingsBit() {
    return await this.mongoDBService.find("meetings");
  }

  async getMeetings(request, response) {
    response.send(await this.runfBitWithMongo(this.getMeetingsBit.bind(this)));
  }

  async getMeetingBit(request) {
    try {
      let ret = await this.mongoDBService.findOne("meetings", {
        _id: ObjectId(request.params.id),
      });
      if (ret) {
        return ret;
      } else {
        return { _id: -1 };
      }
    } catch (error) {
      console.log(error);
      return { _id: -1 };
    }
  }

  async getMeeting(request, response) {
    response.send(
      await this.runfBitWithMongo(this.getMeetingBit.bind(this, request))
    );
  }

  async postMeetingBit(request) {
    return await this.mongoDBService.insert("meetings", {
      title: request.body.title,
      description: request.body.description,
      date: request.body.date,
      time: request.body.time,
      participants: request.body.participants,
    });
  }

  async postMeeting(request, response) {
    response.send(
      await this.runfBitWithMongo(this.postMeetingBit.bind(this, request))
    );
  }

  async putMeetingBit(request) {
    return await this.mongoDBService.update(
      "meetings",
      { _id: ObjectId(request.params.id) },
      {
        title: request.body.title,
        description: request.body.description,
        date: request.body.date,
        time: request.body.time,
        participants: request.body.participants,
      }
    );
  }

  async putMeeting(request, response) {
    response.send(
      await this.runfBitWithMongo(this.putMeetingBit.bind(this, request))
    );
  }

  async deleteMeetingBit(request) {
    return await this.mongoDBService.delete("meetings", {
      _id: ObjectId(request.params.id),
    });
  }

  async deleteMeeting(request, response) {
    response.send(
      await this.runfBitWithMongo(this.deleteMeetingBit.bind(this, request))
    );
  }
}

module.exports = Controller;
