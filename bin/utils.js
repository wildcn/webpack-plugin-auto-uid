"use strict";

var SUCCESS = "#42b983";
var INFO = "#ffeb3b";
var WARNING = "#ffb7da";

var color = function color(_color) {
  return function (content) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    console.log("%c[webpack-plugin-auto-uid]", "color:" + _color + ";background:#333", content + " " + args.join(" "));
  };
};

module.exports = {
  logSuc: color(SUCCESS),
  logErr: color(WARNING),
  logInfo: color(INFO)
};