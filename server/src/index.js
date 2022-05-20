const express = require("express");
const bodyParser = require("body-parser");
const Controller = require("./controllers/Controller");
const cors = require("cors");
const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const controller = new Controller();
registerRoutes(app, controller);

app.listen(port, () => console.log(`API is listening on port ${port}!`));

function registerRoutes(app, controller) {
  app.get("/users", controller.getUsers.bind(controller));

  app.get("/meetings", controller.getMeetings.bind(controller));

  app.get("/meetings/:id", controller.getMeeting.bind(controller));

  app.post("/meetings", controller.postMeeting.bind(controller));

  app.put("/meetings/:id", controller.putMeeting.bind(controller));

  app.delete("/meetings/:id", controller.deleteMeeting.bind(controller));
}
