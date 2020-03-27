const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, next) => {
  // 전달 값 체크
  const { user_sts, user_type, user_nm, mcht_user_type, counter_pass, counter_cert,
     mcht_no, tel_no, remark, user_id } = req.body
  let { confirm_dt, confirm_tm, can_dt, can_tm } = req.body

  if(confirm_dt && confirm_dt.length != 8) confirm_dt = confirm_dt.split('/')[0] + confirm_dt.split('/')[1] + confirm_dt.split('/')[2]
  if(confirm_tm && confirm_tm.length != 6) confirm_tm = confirm_tm.split(':')[0] + confirm_tm.split(':')[1] + confirm_tm.split(':')[2]

  if(can_dt && can_dt.length != 8) can_dt = can_dt.split('/')[0] + can_dt.split('/')[1] + can_dt.split('/')[2]
  if(can_tm && can_tm.length != 6) can_tm = can_tm.split(':')[0] + can_tm.split(':')[1] + can_tm.split(':')[2]

  let query = 'UPDATE CE_USER_MST SET user_sts=?, user_type=?, user_nm=?, mcht_user_type=?,'
              + ' counter_pass=?, counter_cert=?, confirm_dt=?,'
              + ' confirm_tm=?, can_dt=?, can_tm=?, tel_no=?, remark=?'
  let params = [
      user_sts, user_type, user_nm, mcht_user_type, counter_pass, counter_cert, confirm_dt,
      confirm_tm, can_dt, can_tm, tel_no, remark
  ]

  if(mcht_no){
    query += ', mcht_no=?'
    params.push(mcht_no)
  }

  query += ' WHERE user_id=?'
  params.push(user_id)

  db.query(query, params, err => {

    if(err && typeof err === 'object') return next(err)

    return res.json({ resCode: 200 })

  })



}
