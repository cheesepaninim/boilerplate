const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, next) => {

  // 전달 값 체크
  const { bull_type, bull_category, att_filename,
    bull_title_ko, bull_cont_ko, bull_title_cn, bull_cont_cn, bull_title_en, bull_cont_en
  } = req.body
  let { push_start_dt, push_end_dt } = req.body

  const user_no = 99999999 // admin
  const push_start_tm = '00:00'
  const push_end_tm = '23:59'
  const reg_dt = moment().format('YYYYMMDD') // now
  const reg_tm = moment().format('HHmmss') // now
  const bull_sts = 2

  push_start_dt = push_start_dt.length === 8
    ? push_start_dt : push_start_dt.split('/')[0]+push_start_dt.split('/')[1]+push_start_dt.split('/')[2]
  push_end_dt = push_end_dt.length === 8
    ? push_end_dt : push_end_dt.split('/')[0]+push_end_dt.split('/')[1]+push_end_dt.split('/')[2]

  const query = 'INSERT INTO CE_BOARD SET ?'
  const params = {
    user_no, bull_type, bull_sts, bull_category, att_filename, reg_dt, reg_tm,
    push_start_dt, push_start_tm, push_end_dt, push_end_tm,
    bull_title_ko, bull_cont_ko, bull_title_cn, bull_cont_cn, bull_title_en, bull_cont_en
  }



  db.query(query, params, err => {

    if(err && typeof err === 'object') return next(err)

    return res.json({ resCode: 200 })

  })
}
