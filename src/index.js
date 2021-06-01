const shell = require("shelljs");
let { logSuc, logInfo, logErr } = require("./utils");

const exec = command => {
  return new Promise((resolve, reject) => {
    shell.exec(command, (code, stdout, stderr) => {
      if (+code === 0 && stdout) {
        resolve(stdout);
      } else {
        reject(stderr);
      }
    });
  });
};

class AutoUid {
  constructor(options) {
    if (!options.debug) {
      logSuc = logInfo = () => {};
    }
    logSuc("running!");
    this.options = options;
    this.PROJECT_ROOT = process.env.PWD || process.cwd();
  }
  apply(compiler) {
    if (this.options.enable) {
      const { beforeRun, done } = compiler.hooks;
      beforeRun.tapAsync("AutoUid", async (compilation, callback) => {
        logSuc("beforeRun!");
        // 编译前 使用auto-uid修改源码
        if (this.options.clean) {
          await this.cleanUid();
          return callback();
        }
        await this.genUid();
        callback();
      });
      if (!this.options.clean) {
        done.tap("AutoUid", async () => {
          logSuc("done!");
          await this.cleanUid();
        });
      }
    }
  }
  async genUid() {
    if (!shell.which("auto-uid")) {
      logInfo("less auto-uid,install it!");
      await exec(`npm install auto-uid`);
    }
    // 获取项目主目录
    let command = `auto-uid --auto`;
    if (this.options.dom) {
      command += " --dom";
    }
    if (this.options.update) {
      command += " --update";
    }
    shell.cd(this.PROJECT_ROOT);
    try {
      await exec(command);
      logSuc("auto-uid --auto done");
    } catch (err) {
      logErr(err);
    }
  }
  async cleanUid() {
    shell.cd(this.PROJECT_ROOT);
    try {
      logInfo("auto-uid --clean start");
      await exec(`auto-uid --clean`);
      logInfo("auto-uid --clean done");
    } catch (err) {
      logErr(err);
    }
  }
}
module.exports = AutoUid;
