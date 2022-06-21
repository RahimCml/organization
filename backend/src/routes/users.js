const express = require('express')
const User = require('../models/user')
const superAdmin = require('../models/superAdmin')

const router = express.Router()


router.post('/register', async (req, res, next) => {
  const descriptor = {
    name: [
      { required: true, message: 'Your name is required.\n' },
      {
        min: 2,
        message: 'Name should have a minimum length of 2 characters.\n',
      },
      {
        max: 64,
        message: 'Name should have a maximum length of 64 characters.\n',
      },
    ],
    password: [
      { required: true, message: 'Password is required.\n' },
      {
        min: 8,
        message: 'Password should have a minimum length of 8 characters.\n',
      },
      {
        pattern: /[a-zA-Z]/,
        message: 'Password should include at least one letter.\n',
      },
      {
        pattern: /\d/,
        message: 'Password should include at least one digit.\n',
      },
      {
        pattern: /[\W_]/,
        message: 'Password should include at least one symbol.\n',
      },
      { pattern: /^\S+$/, message: 'Password should not include spaces.\n' },
    ],
    passwordConfirmation: [
      { required: true, message: 'Password confirmation is required.\n' },
      {
        validator(rule, value, callback, source) {
          return source.password === value || new Error('The passwords you entered are inconsistent.\n')
        },
      },
    ],
    email: [
      { type: 'email', message: 'E-mail is not valid.\n' },
      { required: true, message: 'E-mail is required.\n' },
    ],
  }
  const validator = new Validator(descriptor)
  if (req.body.user) {
    try {
      await validator.validate(req.body.user)
    } catch ({ errors }) {
      return next({ message: errors.map(e => e.message).join('') })
    }

    try {
      const createdUser = new User(req.body.user)
      const user = await User.register(createdUser, req.body.user.password)
      if (!user) return next({ status: 422 })
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  }
  if (req.body.superadmin) {
    try {
      await validator.validate(req.body.superadmin)
      console.log('obaa', req.body)
    } catch ({ errors }) {
      return next({ message: errors.map(e => e.message).join('') })
    }

    try {
      const createdSuperAdmin = new superAdmin(req.body.superadmin)
      const superadminData = await superAdmin.register(createdSuperAdmin, req.body.superadmin.password)
      if (!superadminData) return next({ status: 422 })
      return res.sendStatus(200)
    } catch (e) {
      return next(e)
    }
  }
  if (req.body.organizationadmin)
    try {
      await validator.validate(req.body.organizationadmin)
    } catch ({ errors }) {
      return next({ message: errors.map(e => e.message).join('') })
    }

  try {
    const createdOrganizationAdmin = new organizationAdmin(req.body.organizationadmin)
    const organizationAdminData = await organizationAdmin.register(
      createdOrganizationAdmin,
      req.body.organizationadmin.password
    )
    if (!organizationAdminData) return next({ status: 422 })
    return res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
})

const preventLoginForLoggedInUsers = (req, res, next) => {
  next(req.user && new Error('User is already logged in'))
}
router.post(
  '/session',
  preventLoginForLoggedInUsers,
  passport.authenticate('local', { failWithError: true }),
  async (req, res) => {
    const check = superAdmin.findOne(req.user._id)
    console.log('check session', check)
    if (check) {
      res.send(req.user)
    }
  },
  (err, req, res, next) => {
    if (err.status !== 401) return next(err)

    next(
      new Error('The username and password you provided did not match our records. Please double-check and try again.')
    )
    console.log(req.user)
    return res.sendStatus(404)
  }
)

router.post('/invite/superAdmin', async (req, res) => {
  const data = req.body
  const Id = uuid.v4()
  const invite = await superAdmin.findByIdAndUpdate(data.superAdminId, {
    $push: {
      superAdminInviteId: Id,
    },
  })
  res.send(Id)
})

router.post('/invite/organizationAdmin', async (req, res) => {
  const data = req.body
  const Id = uuid.v4()
  const invite = await superAdmin.findByIdAndUpdate(data.superAdminId, {
    $push: {
      organizationAdminInviteId: Id,
    },
  })
  res.send(Id)
})

router.post('/checkInviteCodeForSuperAdmin', async (req, res) => {
  const checkCodeForSuperAdmin = await superAdmin.findOne({ superAdminInviteId: req.body.inviteCode })
  if (checkCodeForSuperAdmin.superAdminInviteId) {
    const superadmin = 'SuperAdmin'
    res.send(superadmin)
  }
  if (checkCodeForSuperAdmin.superAdminInviteId == null) {
    res.sendStatus(404)
  }
})

router.post('/checkInviteCodeForOrganization', async (req, res) => {
  const checkCodeForOrganizationAdmin = await superAdmin.findOne({ organizationAdminInviteId: req.body.inviteCode })
  if (checkCodeForOrganizationAdmin.organizationAdminInviteId) {
    const organizationAdmin = 'OrganizationAdmin'
    res.send(organizationAdmin)
  }
  if (checkCodeForOrganizationAdmin.organizationAdminInviteId == null) {
    res.sendStatus(404)
  }
})
module.exports = router
