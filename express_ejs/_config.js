/*
  exports;
  options, mode, port, mysql, db_series, mailer, err, err_handler, logger
*/
const fs = require('fs')
const async = require('async')
const moment = require('moment')

const options = {
  cookie_session: {
    name: '',
    keys: ['', ''],
    maxAge: 1000 * 60 * 60 * 24 // 1d
  },
  mysql: {
    host: '', port: 3306,
    user: '', password : '',
    database : ''
  },
  mailer: {
    host: '', port: 0, secure: true,
    auth: { user: '', pass: '' },
    from: ''
  },
  kakao_map: {
    key: ''
  }
}

const mysql = () => require('mysql').createPool(options.mysql)

const db_series = function(){
  this.conn
  this.run = (fns, cb) => {
    mysql().getConnection((error, conn) => {
      this.conn = conn
      async.series(
        [ callback => callback(error ? err(error, new Error): null), ...fns ],
        err => { conn.release(); cb(err) }
      )
    })
  }
}

const self = module.exports = {
  options,
  mode: process.env.NODE_ENV || process.argv[2],
  port: 8806,

  mysql, db_series,

  mailer: require('nodemailer').createTransport(options.mailer),

  err: (err, err2) => {
    err.stack += `\n${ err2.stack }\nSERVER_FLAG`
    return err
  },

  err_handler: (err, data) => {
    const now = moment()
    const path = `log/${now.format('YYYYMMDD')}.txt`
    const body =
      now.format('YYYY-MM-DD HH:mm:ss')+ '\n'
      + (err.stack ? err.stack : err)
      + (data ? `\n\n${data}\n\n\n` : '\n\n\n')

    fs.appendFile(path, body, err => err ? console.log(body) : null)
  },

  logger: (log_table, log) => {
    const now = moment()
    const query = 'INSERT INTO '+ log_table +' SET ? '
    mysql().query(query, log, err => err && self.err_handler(self.err(err, new Error)))
  }

}
