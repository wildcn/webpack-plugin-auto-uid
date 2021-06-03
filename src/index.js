const shell = require("shelljs");
let { logSuc, logInfo, logErr } = require("./utils");
const AutoUid = require("auto-uid");


const exec = command => {
  return new Promise((resolve, reject) => {
    shell.exec(command, { slice: true }, (code, stdout, stderr) => {
      if (+code === 0 && stdout) {
        resolve(stdout);
      } else {
        reject(stderr);
      }
    });
  });
};

class WebpackPluginAutoUid {
  constructor(options) {
    if (!options.debug) {
      logSuc = logInfo = () => {};
    }
    logInfo(`before run autoUid,comfirm your project has not unpush source.`);
    this.options = options;
    this.PROJECT_ROOT = process.env.PWD || process.cwd();
  }
  apply(compiler) {
    if (this.options.enable) {
      const { beforeRun, done } = compiler.hooks;
      beforeRun.tapAsync(
        "WebpackPluginAutoUid",
        async (compilation, callback) => {
          logSuc("beforeRun!");
          // 编译前 使用auto-uid修改源码
          if (this.options.clean) {
            await this.cleanUid();
            return callback();
          }
          await this.genUid();
          callback();
        }
      );
      // done.tap(async () => {
      //   logInfo("done");
      //   await this.cleanUid();
      // });
    }
  }
  async checkAutoUid() {
    if (!shell.which("auto-uid")) {
      logErr("less auto-uid,install it!");
      await exec(`npm install auto-uid`);
      logInfo(`auto-uid install success!`);
    }
  }
  async genUid() {
    await this.checkAutoUid();
    const options = {
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
      let APP = new AutoUid(options).project;
      APP.process();
      this.changeFiles = APP.realChangeFiles;
      logSuc(
        "auto-uid work done ,options: ",
        JSON.stringify(Object.keys(options))
      );
    } catch (err) {
      logErr("genUid", err);
    }
  }
  async cleanUid() {
    if (this.changeFiles) {
      shell.cd(this.PROJECT_ROOT);
      try {
        logInfo("auto-uid --clean start");
        if (shell.which("git")) {
          const command = `git checkout -- ${this.changeFiles.join(" ")}`;
          logInfo(command);
          await exec(command);
        }
        logInfo("changeFile checkout!");
        delete this.changeFiles;
      } catch (err) {
        logErr("cleanUid", err);
      }
    }
  }
}
module.exports = WebpackPluginAutoUid;
