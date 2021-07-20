"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shell = require("shelljs");

var _require = require("./utils"),
    logSuc = _require.logSuc,
    logInfo = _require.logInfo,
    logErr = _require.logErr;

var AutoUid = require("auto-uid");

var exec = function exec(command) {
  return new _promise2.default(function (resolve, reject) {
    shell.exec(command, function (code, stdout, stderr) {
      if (+code === 0 && stdout) {
        resolve(stdout);
      } else {
        reject(stderr);
      }
    });
  });
};

var WebpackPluginAutoUid = function () {
  function WebpackPluginAutoUid(options) {
    (0, _classCallCheck3.default)(this, WebpackPluginAutoUid);

    if (!options.debug) {
      logSuc = logInfo = function logInfo() {};
    }
    logInfo("before run autoUid,comfirm your project has not unpush source.");
    logInfo("options: " + (0, _stringify2.default)(options));
    this.options = options;
    this.PROJECT_ROOT = process.env.PWD || process.cwd();
  }

  (0, _createClass3.default)(WebpackPluginAutoUid, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      if (this.options.enable) {
        var _compiler$hooks = compiler.hooks,
            beforeRun = _compiler$hooks.beforeRun,
            done = _compiler$hooks.done;

        beforeRun.tapAsync("WebpackPluginAutoUid", function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(compilation, callback) {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    logSuc("beforeRun!");
                    // 编译前 使用auto-uid修改源码

                    if (!_this.options.clean) {
                      _context.next = 5;
                      break;
                    }

                    _context.next = 4;
                    return _this.cleanUid();

                  case 4:
                    return _context.abrupt("return", callback());

                  case 5:
                    logInfo("genUid start");
                    _context.next = 8;
                    return _this.genUid();

                  case 8:
                    if (!_this.options.lintShell) {
                      _context.next = 19;
                      break;
                    }

                    logInfo("lintShell: " + _this.options.lintShell);
                    _context.prev = 10;

                    shell.cd(_this.PROJECT_ROOT);
                    _context.next = 14;
                    return exec(_this.options.lintShell);

                  case 14:
                    _context.next = 19;
                    break;

                  case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](10);

                    logErr("lintSlell error:", _context.t0);

                  case 19:

                    callback();

                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this, [[10, 16]]);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
        if (!this.options.keepChange) {
          done.tap("WebpackPluginAutoUid", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    logInfo("done");
                    _context2.next = 3;
                    return _this.cleanUid();

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          })));
        }
      }
    }
  }, {
    key: "genUid",
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var options, APP;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = {
                  auto: true
                };

                if (this.options.dom) {
                  options.dom = true;
                }
                if (this.options.update) {
                  options.update = true;
                }
                shell.cd(this.PROJECT_ROOT);
                try {
                  APP = new AutoUid(options).project;

                  APP.process();
                  this.changeFiles = APP.realChangeFiles;
                  logSuc("auto-uid work done ,options: ", (0, _stringify2.default)((0, _keys2.default)(options)));
                } catch (err) {
                  logErr("genUid", err);
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genUid() {
        return _ref3.apply(this, arguments);
      }

      return genUid;
    }()
  }, {
    key: "cleanUid",
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var command;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.changeFiles) {
                  _context4.next = 16;
                  break;
                }

                shell.cd(this.PROJECT_ROOT);
                _context4.prev = 2;

                logInfo("auto-uid --clean start");

                if (!shell.which("git")) {
                  _context4.next = 9;
                  break;
                }

                command = "git checkout -- " + this.changeFiles.join(" ");

                logInfo(command);
                _context4.next = 9;
                return exec(command);

              case 9:
                logInfo("changeFile checkout!");
                delete this.changeFiles;
                _context4.next = 16;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](2);

                logErr("cleanUid", _context4.t0);

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 13]]);
      }));

      function cleanUid() {
        return _ref4.apply(this, arguments);
      }

      return cleanUid;
    }()
  }]);
  return WebpackPluginAutoUid;
}();

module.exports = WebpackPluginAutoUid;