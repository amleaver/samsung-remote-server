const express = require("express"),
  morgan = require("morgan"),
  logger = require("./logger"),
  Remote = require("./remote");

const app = express();
const remoteConnector = new Remote("192.168.1.154", "Samsung Remote Server");

app.use(morgan("combined"));

app.listen(3000, function() {
  logger.info("Samsung Remote Server started on port 3000");
});

var sendResponse = function(res, success) {
  if (success) {
    res.send({ status: "success" });
  } else {
    res.status(400).json({ status: "fail" });
  }
};

app.get("/status", function(req, res) {
  remoteConnector.connect(function(isOn) {
    sendResponse(res, isOn);
  });
});

app.post("/commands/custom/:key", function(req, res) {
  remoteConnector.sendCommand(req.params.key, function(success) {
    sendResponse(res, success);
  });
});

app.post("/commands/mute", function(req, res) {
  remoteConnector.sendMute(function(success) {
    sendResponse(res, success);
  });
});

app.post("/commands/power", function(req, res) {
  remoteConnector.sendPower(function(success) {
    sendResponse(res, success);
  });
});

app.post("/commands/play", function(req, res) {
  remoteConnector.sendPlay(function(success) {
    sendResponse(res, success);
  });
});

app.post("/commands/pause", function(req, res) {
  remoteConnector.sendPause(function(success) {
    sendResponse(res, success);
  });
});
