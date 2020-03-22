"use strict";

var sentences = [{
  subject: "Javascript",
  verb: "is",
  object: "great"
}, {
  subject: "Elephants",
  verb: "are",
  object: "large"
}];

function say(_ref) {
  var subject = _ref.subject,
      verb = _ref.verb,
      object = _ref.object;
  console.log("".concat(subject, " ").concat(verb, " ").concat(object));
}

for (var _i = 0, _sentences = sentences; _i < _sentences.length; _i++) {
  var s = _sentences[_i];
  say(s);
}