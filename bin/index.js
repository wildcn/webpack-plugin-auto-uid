"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shell = require("shelljs");

var _require = require("./utils"),
    logSuc = _require.logSuc,
    logInfo = _require.logInfo,
    logErr = _require.logErr;

var exec = function exec(command) {
  return new Promise(function (resolve, reject) {
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
    _classCallCheck(this, AutoUid);

    if (!options.debug) {
      logSuc = logInfo = function logInfo() {};
    }
    logSuc("running!");
    this.options = options;
    this.PROJECT_ROOT = process.env.PWD || process.cwd();
  }

  _createClass(AutoUid, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      if (this.options.enable) {
        var _compiler$hooks = compiler.hooks,
            beforeRun = _compiler$hooks.beforeRun,
            done = _compiler$hooks.done;

        beforeRun.tapAsync("AutoUid", function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(compilation, callback) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
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
          done.tap("AutoUid", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var command;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
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