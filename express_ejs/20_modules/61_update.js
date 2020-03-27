const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, next) => {
  // 전달 값 체크
  const { bull_type, bull_sts, bull_category, push_start_dt, push_end_dt, reg_dt,
    att_filename, bull_title_ko, bull_cont_ko, bull_title_cn, bull_cont_cn, bull_title_en,
    bull_cont_en, bull_reply, seq_no } = req.body
  let { bull_replier_id, bull_reply_dt } = req.body

  if(bull_reply_dt && bull_reply_dt.length != 8) bull_reply_dt = bull_reply_dt.split('/')[0] + bull_reply_dt.split('/')[1] + bull_reply_dt.split('/')[2]

  let query = 'UPDATE CE_BOARD SET bull_type=?, bull_sts=?, bull_category=?, push_start_dt=?, push_end_dt=?, reg_dt=?,'
            + ' att_filename=?, bull_title_ko=?, bull_cont_ko=?, bull_title_cn=?, bull_cont_cn=?, bull_title_en=?,'
            + ' bull_cont_en=?'
  let params = [bull_type, bull_sts, bull_category, push_start_dt, push_end_dt, reg_dt,
    att_filename, bull_title_ko, bull_cont_ko, bull_title_cn, bull_cont_cn, bull_title_en,
    bull_cont_en]

  if(bull_reply !== ''){
    query += ', bull_reply=?'
    params.push(bull_reply)

    if(bull_replier_id === ''){
      bull_replier_id = req.session.user
      bull_reply_dt = moment().format('YYYYMMDD')

      query += ', bull_replier_id=?, bull_reply_dt=?'
      params.push(bull_replier_id, bull_reply_dt)
    }
  }

  query += ' WHERE seq_no=?'
  params.push(seq_no)



  db.query(query, params, err => {

    if(err && typeof err === 'object') return next(err)

    return res.json({ resCode: 200 })

  })






}
