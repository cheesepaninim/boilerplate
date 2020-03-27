const fs = require('fs')
const config = require('./_config')
const auth = require('./_auth')

let viewList = []
fs.readdirSync(__dirname).map(dir => {
  if(parseInt(dir.substr(0, 2))){
    fs.readdirSync(`${__dirname}/${dir}`).map(file => {
      if(dir.substr(0, 2) === '10' && file.substr(-4) === '.ejs' && file.substr(0, 1) !== '_') {
        viewList.push(file.substr(0, file.lastIndexOf('.')))
      }
    })
  }
})

module.exports = app => {

  app.get('/', (req, res) => {
    const user_auth = req.session.user_auth
    const page = auth.auth[user_auth].redirection
    const title = page.split('_')[1]

    return res.redirect(page)
  })



  app.get('/:page', (req, res, next) => {
    let { page } = req.params
    const title = page.split('_')[1]
    const { user, user_auth, user_nm } = req.session

    if(viewList.indexOf(page) < 0) return res.end('404')

    // if(page === '00_test') return res.end('404')
    if(auth.auth_check(page, user_auth) < 0)
      return res.redirect(auth.auth[user_auth].redirection)

    const resData = {
      page, title,
      user: {
        user_nm, user_auth, user_view: auth.auth[user_auth].view
      },
      menu: auth.menu
    }

    return res.render('_template', resData)
  })



  app.get('/:page/:todo', (req, res, next) => {

    const { page } = req.params
    const title = page.split('_')[1]
    let { todo } = req.params
    const { user_auth, user_nm } = req.session

    if(auth.auth_check(page, user_auth) < 0)
      return res.redirect(auth.auth[user_auth].redirection)

    const mod = todo.substr(0,6) === 'select' // popup
      ? '02_' + todo
      : page.split('_')[0] + '_' + todo

    let resData = {
      page: mod,
      title,
      user: {
        user_nm, user_auth, user_view: auth.auth[user_auth].view
      },
      menu: auth.menu,
    }

    require('./20_modules/' + mod)(req, res, resData, next)
  })

  app.post('/:page/:todo', (req, res, next) => {

    const { page } = req.params
    const title = page.split('_')[1]
    let { todo } = req.params
    const { user_auth, user_nm } = req.session

    if(auth.auth_check(page, user_auth) < 0)
      return res.redirect(auth.auth[user_auth].redirection)

    const mod = todo.substr(0,6) === 'select' // popup
      ? '02_' + todo
      : page.split('_')[0] + '_' + todo

    require('./20_modules/' + mod)(req, res, next)
  })



  app.use((err, req, res, next) => {
    config.err_handler(err)
    console.log(err)
    if(!err.msg) return res.json({ resCode: 'error', msg: 'R-000-00' })
    else return res.json({ resCode: 'error', msg: err.msg})
  })

}
