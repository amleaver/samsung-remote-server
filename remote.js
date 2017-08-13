const samsungRemote = require("new-samsung-remote"),
  logger = require("./logger");

module.exports = function(ipAddress, remoteName) {
  this.ipAddress = ipAddress;
  this.remoteName = remoteName;

  const config = {
    ip_address: this.ipAddress,
    name: this.remoteName
  };

  const remote = samsungRemote(config);

  this.connect = function(done) {
    remote.api_active(done);
  };

  this.sendCommand = function(key, done) {
    logger.info("Attempting to send " + key);

    this.connect(function(isOn) {
      if (isOn) {
        logger.info("TV online, sending...");

        remote.sendKey(key, function(err, res) {
          if (err) {
            logger.error("Cound not send command");
            logger.error(err);
            done(false);
          } else {
            logger.info("Successfully sent command");
            done(true);
          }
        });
      } else {
        logger.error("Unable to send command, TV unreachable");
        done(false);
      }
    });
  };

  this.sendPower = function(done) {
    this.sendCommand("KEY_POWER", done);
  };

  this.sendMute = function(done) {
    this.sendCommand("KEY_MUTE", done);
  };

  this.sendPlay = function(done) {
    this.sendCommand("KEY_PLAY", done);
  };

  this.sendPause = function(done) {
    this.sendCommand("KEY_PAUSE", done);
  };
};
