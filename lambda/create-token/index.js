var OpenTok = require('opentok');

exports.handler = (event, context, callback) => {
  var opentok = new OpenTok('45618062', 'edb39606f11cd02a3f1f884d73171cd4ab7f4e22');
  var token = opentok.generateToken(event.sessionId, event.options);
  callback(null, { token: token })
};
