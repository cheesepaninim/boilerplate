const config = require('../_config')
const moment = require('moment')
const auth = require('./../_auth')
const db = config.mysql()

module.exports = (req, res, resData, next) => {
  // 전달 값 체크
  const { user_id } = req.query

  let query = 'SELECT u.user_no, u.user_id, u.user_sts, u.user_type, u.user_nm, u.mcht_user_type,'
            + ' u.counter_pass, u.wallet_address, u.reg_dt, u.reg_tm, u.counter_cert, u.cert_req_tm,'
            + ' u.confirm_dt, u.confirm_tm, u.can_dt, u.can_tm, u.mcht_no, m.mcht_nm_ko, u.tel_no, u.remark'
            + ' FROM CE_USER_MST u'
            + ' LEFT JOIN CE_MCHT_MST m ON u.mcht_no = m.mcht_no'
  let params = [ user_id ]

  query = 'SELECT * FROM ('+query+') result WHERE result.user_id = ?'

  db.query(query, params, (err, rows) => {
    if(err && typeof err === 'object') return next(err)

    if(!rows) return res.json({ resCode: 100, msg: 'Unexpected error occured\n(error_code: V-11)' })
    if(!rows[0]) return res.json({ resCode: 404, msg: '조회 결과가 없습니다.' })
    
    else {
      resData = {...resData, rows}
      return res.render('_template', resData)
    }
  })

}
