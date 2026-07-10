const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/applicant-type', function (req, res) {
  res.render('applicant-type')
})

router.post('/applicant-type', function (req, res) {
  const answer = req.session.data['applicant-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-type': 'Select who you are applying for.' }
    return res.render('applicant-type')
  }
  if (answer === 'myself') {
    return res.redirect('/uk-resident')
  } else if (answer === 'someone-else') {
    return res.redirect('/ineligible-applicant-type')
  }
  res.redirect('/uk-resident')
})

router.get('/ineligible-applicant-type', function (req, res) {
  res.render('ineligible-applicant-type')
})

router.get('/uk-resident', function (req, res) {
  res.render('uk-resident')
})

router.post('/uk-resident', function (req, res) {
  const answer = req.session.data['uk-resident']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'uk-resident': 'Select yes if you live in the UK.' }
    return res.render('uk-resident')
  }
  if (answer === 'yes') {
    return res.redirect('/applicant-age')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-uk-resident')
  }
  res.redirect('/applicant-age')
})

router.get('/ineligible-uk-resident', function (req, res) {
  res.render('ineligible-uk-resident')
})

router.get('/applicant-age', function (req, res) {
  res.render('applicant-age')
})

router.post('/applicant-age', function (req, res) {
  const answer = req.session.data['applicant-age']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'applicant-age': 'Select yes if you are 18 or older.' }
    return res.render('applicant-age')
  }
  if (answer === 'yes') {
    return res.redirect('/support-type')
  } else if (answer === 'no') {
    return res.redirect('/ineligible-applicant-age')
  }
  res.redirect('/support-type')
})

router.get('/ineligible-applicant-age', function (req, res) {
  res.render('ineligible-applicant-age')
})

router.get('/support-type', function (req, res) {
  res.render('support-type')
})

router.post('/support-type', function (req, res) {
  const answer = req.session.data['support-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'support-type': 'Select the type of support you are applying for.' }
    return res.render('support-type')
  }
  if (answer === 'financial') {
    return res.redirect('/full-name')
  } else if (answer === 'practical') {
    return res.redirect('/full-name')
  } else if (answer === 'not-sure') {
    return res.redirect('/ineligible-support-type')
  }
  res.redirect('/full-name')
})

router.get('/ineligible-support-type', function (req, res) {
  res.render('ineligible-support-type')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name.' }
    return res.render('full-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('AS')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
