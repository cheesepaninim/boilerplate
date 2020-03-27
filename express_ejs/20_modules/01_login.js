const config = require('../_config')
const auth = require('../_auth')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, next) => {
  // console.log(`[${moment().format('MM-DD hh:mm:ss')}] ${JSON.stringify(req.body.id)} login req`)
  const { id, pwd } = req.body

  if(id === '' || pwd === '') return res.end('hacking')

  const query = 'SELECT user_id, user_pass, user_nm, admin_type FROM aams_user WHERE user_id = ?'
  const params = [id]

  db.query(query, params, (err, rows) => {

    if(err && typeof err === 'object') return next(err)

    if(!rows) return res.end( 'Unexpected error occured\n(error_code: 0-01)' )
    if(!rows[0]) return res.end( '존재하지 않는 사용자입니다.' )


    const user_pass = require('crypto').createHmac('sha256', 'salt').update(pwd).digest('hex') // user entered
    if(user_pass !== rows[0].user_pass) return res.end( '비밀번호가 틀렸습니다.' )


    req.session.user = rows[0].user_id
    req.session.user_auth = auth.type[rows[0].admin_type]
    req.session.user_nm = rows[0].user_nm

    return res.end('200')

  })

}
