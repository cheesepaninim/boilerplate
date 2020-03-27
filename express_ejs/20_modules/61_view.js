const config = require('../_config')
const moment = require('moment')

module.exports = (req, res, resData, next) => {
  // 전달 값 체크
  const { seq_no } = req.query
  const series = new config.db_series()

  let result

  series.run([

    callback => {

      const query = 'SELECT user_no, bull_type, bull_sts, bull_category, push_start_dt, push_start_tm,'
                  + ' push_end_dt, push_end_tm, reg_dt, reg_tm,'
                  + ' att_filename, att_filepath, bull_title_ko, bull_cont_ko,'
                  + ' bull_title_cn, bull_cont_cn, bull_title_en, bull_cont_en,'
                  + ' bull_replier_id, bull_reply_dt, bull_reply_tm, bull_reply, seq_no'
                  + ' FROM CE_BOARD'
                  + ' WHERE seq_no = ?'
      const params = [ seq_no ]

      series.conn.query(query, params, (err, rows) => {
        if(err) return callback(config.err(err, new Error))

        if(!rows) return callback(100)
        if(!rows[0]) return callback(404)

        result = rows

        callback()
      })

    },

    callback => {

      const user_no = result[0].user_no

      if(user_no !== 99999999){
        const query = 'SELECT user_nm FROM CE_USER_MST'
                    + ' WHERE user_no = ?'
        const params = [ user_no ]

        series.conn.query(query, params, (err, rows) => {
          if(err) return callback(config.err(err, new Error))
          if(!rows) return callback(100)
          if(!rows[0]) return callback(404)

          result[0].user_nm = rows[0].user_nm

          callback()
        })
      }
      else{
        result[0].user_nm = '관리자'

        callback()
      }

    }

  ], err => { // check#

    if(err && typeof err === 'object') return next(err)

    else if(err) {
      let msg = ''

      switch(err){
        case 100:
          msg = 'Unexpected error occured\n(error_code: V-61)'
          break

        case 404:
          msg = '조회 결과가 없습니다.'
          break
        
      }

      return res.json({ resCode: err, msg: msg })
    }

    resData = {...resData, rows: result}
    return res.render('_template', resData)

  })



}
