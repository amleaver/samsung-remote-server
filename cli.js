const Remote = require("new-samsung-remote");
var prompt = require("prompt");

console.log("Starting Samsung Remote");

const config = {
  ip_address: "192.168.1.154",
  name: "New Samsung Remote"
};

const remote = Remote(config);

remote.api_active(ask);

function ask() {
  prompt.start();
  console.log("Enter command");

  prompt.get(["command"], function(err, result) {
    // KEY_PRECH

    console.log("Sending command: " + result.command);
    if (result.command === "exit") {
      console.log("Goodbye");
    } else {
      sendCommand(result.command, ask);
    }
  });
}

function sendCommand(command, done) {
  remote.sendKey(command, function(err, res) {
    if (err) {
      console.log("Cound not send command " + command);
      console.log(err);
    } else {
      console.log(res);
    }

    done();
  });
}
