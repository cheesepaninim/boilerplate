const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, next) => {
  // 전달 값 체크
  const { current_pwd, new_pwd } = req.body
  // const reg_dt = moment().format('YYYYMMDD') // now

  if(current_pwd === new_pwd) return res.json({ resCode: 12, msg: 'err: same password inserted' })
  /*
    비밀번호 조건 체크
  */
  const user_id = req.session.user



  const series = new config.db_series()
  series.run([

    callback => {

      const query = 'SELECT user_pass FROM aams_user WHERE user_id = ?'
      const params = [ user_id ]

      series.conn.query(query, params, (err, rows) => {
        if(err) return callback(config.err(err, new Error))

        const db_user_pwd = rows[0].user_pass
        const user_pwd = require('crypto').createHmac('sha256', 'salt').update(current_pwd).digest('hex')
        if(db_user_pwd !== user_pwd){
          return callback('wrong')
        }

        callback()
      })

    },

    callback => {

      const query = 'UPDATE aams_user SET user_pass =? WHERE user_id = ?'
      const pwd = require('crypto').createHmac('sha256', 'salt').update(new_pwd).digest('hex')
      const params = [ pwd, user_id ]

      series.conn.query(query, params, err => {
        if(err) return callback(config.err(err, new Error))

        callback()
      })

    }

  ], err => { // check#

    if(err && typeof err === 'object') return next(err)

    else if(err) return res.json({ resCode: err })

    return res.json({ resCode: 200 })

  })





}
