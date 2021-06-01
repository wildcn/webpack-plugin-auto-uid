"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var AutoUid = function () {
  function AutoUid(options) {
    (0, _classCallCheck3.default)(this, AutoUid);

    if (!options.debug) {
      logSuc = logInfo = function logInfo() {};
    }
    logSuc("running!");
    this.options = options;
    this.PROJECT_ROOT = process.env.PWD || process.cwd();
  }

  (0, _createClass3.default)(AutoUid, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      if (this.options.enable) {
        var _compiler$hooks = compiler.hooks,
            beforeRun = _compiler$hooks.beforeRun,
            done = _compiler$hooks.done;

        beforeRun.tapAsync("AutoUid", function () {
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
                    _context.next = 7;
                    return _this.genUid();

                  case 7:
                    callback();

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
        if (!this.options.clean) {
          done.tap("AutoUid", (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    logSuc("done!");
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
        var command;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (shell.which("auto-uid")) {
                  _context3.next = 4;
                  break;
                }

                logInfo("less auto-uid,install it!");
                _context3.next = 4;
                return exec("npm install auto-uid");

              case 4:
                // 获取项目主目录
                command = "auto-uid --auto";

                if (this.options.dom) {
                  command += " --dom";
                }
                if (this.options.update) {
                  command += " --update";
                }
                shell.cd(this.PROJECT_ROOT);
                _context3.prev = 8;
                _context3.next = 11;
                return exec(command);

              case 11:
                logSuc("auto-uid --auto done");
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](8);

                logErr(_context3.t0);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 14]]);
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
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                shell.cd(this.PROJECT_ROOT);
                _context4.prev = 1;

                logInfo("auto-uid --clean start");
                _context4.next = 5;
                return exec("auto-uid --clean");

              case 5:
                logInfo("auto-uid --clean done");
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);

                logErr(_context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 8]]);
      }));

      function cleanUid() {
        return _ref4.apply(this, arguments);
      }

      return cleanUid;
    }()
  }]);
  return AutoUid;
}();

module.exports = AutoUid;