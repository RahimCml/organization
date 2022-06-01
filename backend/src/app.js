const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const helmet = require('helmet')
const compression = require('compression')

const User = require('./models/user')
const superAdmin = require('./models/superAdmin')
const organizationAdmin = require('./models/organizationAdmin')

const { mongoose } = require('./database-connection')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use(compression())
app.use(helmet())

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection, stringify: false }),
    secret: 'thisissupposedtobeasecret',
    resave: true,
    secure: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' && 'none',
      secure: process.env.NODE_ENV === 'production',
    },
  })
)

passport.use(User.createStrategy())
passport.use(superAdmin.createStrategy())
passport.use(organizationAdmin.createStrategy())

passport.serializeUser(User.serializeUser())
passport.serializeUser(superAdmin.serializeUser())
passport.serializeUser(organizationAdmin.serializeUser())

passport.deserializeUser(User.deserializeUser())
passport.deserializeUser(superAdmin.deserializeUser())
passport.deserializeUser(organizationAdmin.deserializeUser())

// error handler
/* eslint-disable-next-line */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(req.app.get('env') === 'development' ? { stack: err.stack, message: err.message } : { message: err.message })
})

module.exports = app
