const moment = require('moment');

module.exports = function messages(username,msg){
  return {
    username,
    msg,
    date:moment().format('YYYY-MM-DD HH:mm:ss')
  }
}