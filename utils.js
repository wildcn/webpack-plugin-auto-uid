const SUCCESS = "#42b983";
const INFO = "#ffeb3b";
const WARNING = "#ffb7da";

const color = color => {
  return (content, ...args) => {
    console.log(
      `%c[webpack-plugin-auto-uid]`,
      `color:${color};background:#333`,
      `${content} ${args.join(" ")}`
    );
  };
};

module.exports = {
  logSuc: color(SUCCESS),
  logErr: color(WARNING),
  logInfo: color(INFO)
};
