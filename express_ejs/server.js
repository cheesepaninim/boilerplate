const express = require('express')
const app = express()
const port = 80
const cookieSession = require('cookie-session')
const path = require('path')

const config = require('./_config')
const passport = require('passport')
const passportConfig = require('./20_modules/_passport')

app.set('views', __dirname + '/10_views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(express.static(path.resolve(__dirname, '00_public')))
app.use(express.json('00_public'))
app.use(express.urlencoded({extended: false})) // check#

app.use(require('helmet')())
app.set('trust proxy', 1)
app.use(cookieSession(config.options.cookie_session))



app.get('/favicon*', (req, res) => res.end())
app.post('/login', (req, res, next) => require('./20_modules/01_login')(req, res, next))
app.post('/logout', (req, res, next) => require('./20_modules/01_logout')(req, res, next))
app.post('/03_updateAdminPwd/update', (req, res, next) => require('./20_modules/03_updateAdminPwd')(req, res, next))

app.use((req, res, next) => {
  const title = 'login'
  const pathname = req.originalUrl

  if(!req.session.user) return res.render('./01_login', {title, pathname})
  next()
})

const router = require('./_route')(app)

const server = app.listen(port, () => console.log(`app running on port ${port}`))
