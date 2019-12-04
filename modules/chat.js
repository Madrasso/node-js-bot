
const colors = require('colors/safe');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
  dateBG: 'bgCyan'
});

function con(message, color, colorBG, style) {
    if (message === undefined) {
        console.log("\n")
        return;
    }
    colorBG = "bg" + ((typeof colorBG == "string") ? colorBG : "Black");
    color = (typeof color == "string") ? color : "green";
    style = (typeof style == "string") ? style : "reset";
    console.log(colors.dateBG('[' + dateF() + ']') + ": " + colors[style](colors[colorBG](colors[color](message))));
}


function dateF(date) {
    if (!isNaN(date) && date < 9900000000)
        date *= 1000;
    date = date !== undefined ? new Date(date) : new Date();

    var dYear = date.getFullYear(),
        dMonthF = (date.getMonth() + 1),
        dMonth = dMonthF > 9 ? dMonthF : "0" + dMonthF,
        dDay = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
        dHour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours(),
        dMinutes = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(),
        dSeconds = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds(),
        date_format = dDay + '.' + dMonth + '.' + dYear + ' ' + dHour + ':' + dMinutes + ':' + dSeconds;

    return date_format;
}

function timeConverter(UNIX_timestamp){
    var date = new Date(UNIX_timestamp-25200000);

    var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(), milliseconds = date.getMilliseconds();
    var dHour = hours > 9 ? hours : "0" + hours,
    dMinutes = minutes > 9 ? minutes : "0" + minutes,
    dSeconds = seconds > 9 ? seconds : "0" + seconds,
    dMilliseconds = milliseconds > 9 ? milliseconds : "0" + milliseconds,
    date_format = dHour + ':' + dMinutes + ':' + dSeconds;
    return date_format;
  }

module.exports = {con, timeConverter}
