/*
  exports;

*/

// editable 그리드에 관한 부분(화면 내부) 고려안됨

const type = {0: 'charger', 1: 'general', 9: 'super'}

const auth = {
  charger: {
    redirection: '41_charge',
    view: [
      [],
      [],
      [],
      ['41_charge', '41_new'],
      ['51_exchRate', '52_exchRateRegister', '53_remit', '53_view'],
      []
    ],
    module: []
  },
  general: {
    redirection: '11_user',
    view: [
      ['11_view', '11_user', '12_mchtBookmark'],
      ['21_mcht', '21_new', '21_view'],
      ['31_view', '31_wallet'],
      ['41_charge'],
      ['51_exchRate', '53_remit'],
      ['61_board', '61_new', '61_view', '62_admin', '63_holiday']
    ],
    module: []
  },
  super: {
    redirection: '11_user',
    view: [
      ['11_view', '11_user', '12_mchtBookmark'],
      ['21_mcht', '21_new', '21_view'],
      ['31_view', '31_wallet'],
      ['41_charge', '41_new'],
      ['51_exchRate', '52_exchRateRegister', '53_remit', '53_view'],
      ['61_board', '61_new', '61_view', '62_admin', '63_holiday']
    ],
    module: []
  }
}

const menu = {
  1: { cat_name: '회원정보',
    '11_view': '',
    '11_user': '회원관리',
    '12_mchtBookmark': '가맹점 즐겨찾기',
  },
  2: { cat_name: '가맹점정보',
    '21_mcht':  '가맹점관리',
    '21_new':  '',
    '21_view':  '',
  },
  3: { cat_name: '거래정보',
    '31_view':  '',
    '31_wallet':  '지갑거래내역',
  },
  4: { cat_name: '충전정보',
    '41_charge':  '충전등록내역',
    '41_new':  '',
  },
  5: { cat_name: '환율정보',
    '51_exchRate':  '환율등록내역',
    '52_exchRateRegister':  '환율등록',
    '53_remit':  '송금은행정보',
    '53_view':  '',
  },
  6: { cat_name: '시스템정보',
    '61_board':  '게시판정보',
    '61_new':  '',
    '61_view':  '',
    '62_admin':  'Admin 사용자관리',
    '63_holiday':  '휴일관리',
  },
}

module.exports = {
  type, auth, menu,

  auth_check: (page, user_auth) => {
    const accessible = auth[user_auth].view
    return accessible[Number(page.substr(0,1))-1].indexOf(page)
  }
}
