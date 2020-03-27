const config = require('../_config')
const moment = require('moment')
const db = config.mysql()

// exchange_rate_c=& // CNY -> USD (1) //
// std_usdt_price=& // USDT 단가 (3) //
// exchange_rate_u= // HKD -> USD (2) //

module.exports = (req, res, next) => {
  console.log(req.body)
  const { exchange_rate_c, exchange_rate_h, std_usdt_price } = req.body

  const reg_dt = moment().format('YYYYMMDD') // now
  const reg_tm = moment().format('HHmmss') // now

  const user_id = req.session.user
  const currency_type = 1

  const query = 'INSERT INTO AAMS_EXCHANGE_RATE SET ?'




  const series = new config.db_series()
  series.run([

    callback => {

      const params = {
        reg_dt, reg_tm, currency_type,
        user_id, exchange_rate: exchange_rate_c
      }

      series.conn.query(query, params, err => {
        if(err) return callback(config.err(err, new Error))

        callback()
      })

    },

    callback => {

      const params = {
        reg_dt, reg_tm, currency_type: currency_type + 1,
        user_id, exchange_rate: exchange_rate_h
      }

      series.conn.query(query, params, err => {
        if(err) return callback(config.err(err, new Error))

        callback()
      })

    },

    callback => {

      const params = {
        reg_dt, reg_tm, currency_type: currency_type + 2,
        user_id, std_usdt_price
      }

      series.conn.query(query, params, err => {
        if(err) return callback(config.err(err, new Error))

        callback()
      })

    }

  ], err => {

    if(err && typeof err === 'object') return next(err)

    return res.json({ resCode: 200 })

  })

}
