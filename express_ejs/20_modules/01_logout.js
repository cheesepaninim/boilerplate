const moment = require('moment')

module.exports = (req, res, next) => {
  // console.log(`[${moment().format('MM-DD hh:mm:ss')}] ${JSON.stringify(req.session.user)} logout req`)

  delete req.session.user // check#
  delete req.session.auth // check#
  delete req.session.user_nm // check#
  return res.end('200')
}
