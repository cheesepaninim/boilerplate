const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, resData, next) => {
  // 전달 값 체크
  const { user_no, user_id, mcht_no } = req.query

  let query = 'SELECT f.user_no, u.user_id, u.user_nm, f.mcht_no, m.mcht_nm_ko, f.pay_mcht_rate, f.agent_Rate, f.fee_rate'
              + ' FROM CE_FAV_MCHT f'
              + ' LEFT JOIN CE_USER_MST u ON f.user_no = u.user_no'
              + ' LEFT JOIN CE_MCHT_MST m ON f.mcht_no = m.mcht_no'
  let params = []

  if(user_no !== '' || mcht_no !== ''){
    query += ' WHERE'
  }

  if(user_no !== ''){
    query += ' u.user_no = ?'
    params.push(user_no)
  }

  if(mcht_no !== ''){
    if(params.length !== 0) query += ' AND'
    query += ' f.mcht_no = ?'
    params.push(mcht_no)
  }
  query += ' ORDER BY f.mcht_no DESC'
  // console.log(`query: ${query}\nparams: ${JSON.stringify(params)}`)

  query = 'SELECT @rownum := @rownum + 1 AS rnum, result1.* FROM (' + query + ') result1, '
        + '(SELECT @rownum:=0) r'



  db.query(query, params, (err, rows) => {
    if(err && typeof err === 'object') return next(err)

    if(!rows) return res.json({ resCode: 100, msg: 'Unexpected error occured\n(error_code: L-12)' })
    if(!rows[0]) return res.json({ resCode: 404, msg: '조회 결과가 없습니다.' })

    return res.json({ resCode: 200, rows })
  })

}
