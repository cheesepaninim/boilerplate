const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

module.exports = (req, res, resData, next) => {

  // 전달 값 체크
  const { user_id, user_type, user_sts, mcht_no } = req.query

  let query = 'SELECT u.user_no, u.user_id, u.user_nm, w.pay_bal, u.user_sts, u.user_type, u.mcht_user_type, u.remark, m.mcht_nm_ko'
              + ' FROM CE_USER_MST u'
              + ' LEFT JOIN CE_MCHT_MST m ON u.mcht_no = m.mcht_no'
              + ' LEFT JOIN CE_WALLET_MST w ON u.user_no = w.user_no'
  let params = []



  if(user_id !== '' || user_type !== 'all' || user_sts !== 'all' || mcht_no !== ''){
    query += ' WHERE'
  }

  if(user_id !== ''){
    query += ' u.user_id = ?'
    params.push(user_id)
  }

  if(user_type !== 'all'){
    if(params.length !== 0) query += ' AND'
    query += ' u.user_type = ?'
    params.push(user_type)
  }

  if(user_sts !== 'all'){
    if(params.length !== 0) query += ' AND'
    query += ' u.user_sts = ?'
    params.push(user_sts)
  }

  if(mcht_no !== ''){
    if(params.length !== 0) query += ' AND'
    query += ' u.mcht_no = ?'
    params.push(mcht_no)
  }
  query += ' ORDER BY u.user_no DESC'
  // console.log(`query: ${query}\nparams: ${JSON.stringify(params)}`)

  query = 'SELECT @rownum := @rownum + 1 AS rnum, result1.* FROM (' + query + ') result1, '
        + '(SELECT @rownum:=0) r'



  db.query(query, params, (err, rows) => {
    if(err && typeof err === 'object') return next(err)

    if(!rows) return res.json({ resCode: 100, msg: 'Unexpected error occured\n(error_code: L-11)' })
    if(!rows[0]) return res.json({ resCode: 404, msg: '조회 결과가 없습니다.' })

    for(var i=0; i<rows.length; i++){
      switch(rows[i]['user_type']){
        case '1': rows[i]['user_type'] = 'agency'; break
        case '2': rows[i]['user_type'] = '가맹점'; break
        default : break
      }
      switch(rows[i]['user_sts']){
        case '1': rows[i]['user_sts'] = '최초 이메일 인증 요청중'; break
        case '2': rows[i]['user_sts'] = '최초 이메일 인증 완료'; break
        case '3': rows[i]['user_sts'] = '유저 정보 등록 완료'; break
        case '4': rows[i]['user_sts'] = '가입신청 완료'; break
        case '5': rows[i]['user_sts'] = '회원가입 완료'; break
        case '0': rows[i]['user_sts'] = '탈퇴'; break
        default : break
      }
    }

    return res.json({ resCode: 200, rows })
  })

}
