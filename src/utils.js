import chalk from "chalk";

const ERROR = chalk.bold.red;
const SUCCESS = chalk.greenBright;
const INFO = chalk.bold.blue;
const WARNING = chalk.keyword("orange");

module.exports = {
  logSuc: (...args) =>
    console.log(SUCCESS("[webpack-plugin-auto-uid]"), args.join(" ")),
  logErr: (...args) =>
    console.log(ERROR("[webpack-plugin-auto-uid]"), args.join(" ")),
  logWar: (...args) =>
    console.log(WARNING("[webpack-plugin-auto-uid]"), args.join(" ")),
  logInfo: (...args) =>
    console.log(INFO("[webpack-plugin-auto-uid]"), args.join(" "))
};
