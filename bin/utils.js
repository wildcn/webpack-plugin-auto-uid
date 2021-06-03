"use strict";

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERROR = _chalk2.default.bold.red;
var SUCCESS = _chalk2.default.greenBright;
var INFO = _chalk2.default.bold.blue;
var WARNING = _chalk2.default.keyword("orange");

module.exports = {
  logSuc: function logSuc() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return console.log(SUCCESS("[webpack-plugin-auto-uid]"), args.join(" "));
  },
  logErr: function logErr() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return console.log(ERROR("[webpack-plugin-auto-uid]"), args.join(" "));
  },
  logWar: function logWar() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return console.log(WARNING("[webpack-plugin-auto-uid]"), args.join(" "));
  },
  logInfo: function logInfo() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return console.log(INFO("[webpack-plugin-auto-uid]"), args.join(" "));
  }
};