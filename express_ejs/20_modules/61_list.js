const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, resData, next) => {

  // 전달 값 체크
  const { bull_type, bull_sts } = req.query

  let { reg_dt_start, reg_dt_end } = req.query
  reg_dt_start = reg_dt_start.split('/')[0]+reg_dt_start.split('/')[1]+reg_dt_start.split('/')[2]
  reg_dt_end = reg_dt_end.split('/')[0]+reg_dt_end.split('/')[1]+reg_dt_end.split('/')[2]

  let query = 'SELECT b.seq_no, b.bull_type, b.bull_sts, b.bull_category, u.user_nm,'
              + ' b.bull_title_ko, b.bull_cont_ko, b.bull_title_cn, b.bull_cont_cn,'
              + ' b.bull_title_en, b.bull_cont_en, b.bull_reply, b.view_cnt'
              + ' FROM CE_BOARD b'
              + ' LEFT JOIN CE_USER_MST u ON b.user_no = u.user_no'
  let params = []
  query += ' WHERE b.reg_dt BETWEEN ? AND ?'
  params.push(reg_dt_start, reg_dt_end)



  if(bull_type !== 'all'){
    query += ' AND b.bull_type = ?'
    params.push(bull_type)
  }

  if(bull_sts !== 'all'){
    query += ' AND b.bull_sts = ?'
    params.push(bull_sts)
  }

  query += ' ORDER BY b.seq_no DESC'
  // console.log(`query: ${query}\nparams: ${JSON.stringify(params)}`)

  query = 'SELECT @rownum := @rownum + 1 AS rnum, result1.* FROM (' + query + ') result1, '
        + '(SELECT @rownum:=0) r'



  db.query(query, params, (err, rows) => {
    if(err && typeof err === 'object') return next(err)

    if(!rows) return res.json({ resCode: 100, msg: 'Unexpected error occured\n(error_code: L-61)' })
    if(!rows[0]) return res.json({ resCode: 404, msg: '조회 결과가 없습니다.' })

    for(var i=0; i<rows.length; i++){
      switch(rows[i]['bull_type']){
        case '1': rows[i]['bull_type'] = '공지'; break
        case '2': rows[i]['bull_type'] = 'FAQ'; break
        case '3': rows[i]['bull_type'] = '문의'; break
        default : break
      }
      switch(rows[i]['bull_sts']){
        case '1': rows[i]['bull_sts'] = '요청중'; break
        case '2': rows[i]['bull_sts'] = '처리완료'; break
        case '3': rows[i]['bull_sts'] = '삭제'; break
        default : break
      }
      switch(rows[i]['bull_category']){
        case '1': rows[i]['bull_category'] = '사용안내'; break
        case '2': rows[i]['bull_category'] = '회원가입'; break
        case '3': rows[i]['bull_category'] = '결제'; break
        case '4': rows[i]['bull_category'] = '충전'; break
        case '5': rows[i]['bull_category'] = '기타'; break
        default : break
      }
    }

    return res.json({ resCode: 200, rows })
  })

}
