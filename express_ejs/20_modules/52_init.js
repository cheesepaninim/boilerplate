const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, resData, next) => {

  // 전달 값 체크
  const query = 'SELECT * FROM AAMS_EXCHANGE_RATE WHERE seq_no IN ('
              + 'SELECT max(seq_no) FROM AAMS_EXCHANGE_RATE GROUP BY currency_type'
              + ') ORDER BY currency_type'
  const params = []
  // console.log(`query: ${query}\nparams: ${JSON.stringify(params)}`)



  db.query(query, params, (err, rows) => {
    if(err && typeof err === 'object') return next(err)

    if(!rows) return res.json({ resCode: 100, msg: 'Unexpected error occured\n(error_code: I-52)' })
    if(!rows[0]) return res.json({ resCode: 404, msg: '조회 결과가 없습니다.' })

    return res.json({ resCode: 200, rows })
  })

}
