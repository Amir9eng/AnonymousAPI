import  Anon  from '../model/anon.model'

export const signup = async (req, res) => {
  const { name, username, password, email } = req.body


try {
  const anonExist = await Anon.countDocuments({ $or: [{email} , { username }] })
  if (anonExist) return res.status(400).send('Username/Email already exists')
  const anon = await new Anon({
    name, email, username, password
  }).save()

  res.json({
    message: 'signup sucessful',
    payload: anon
  })
} catch (err) {
  console.log(err)
  res.status(500).send('Internal server error')
}
}

export const login = async(req, res) => {
  const { username, password, email} = req.body


  try {
    const anon = await Anon.findOne({ $or: [{username}, {email}]})
    if (!anon) return res.status(404).send('Incorrect login credentials, please try again')
    if (anon.password !== password) return res.status(404).send('Incorrect login credentials, please try again')

    res.json({
      message: 'login successful',
      payload: anon
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal server error')
  }
}
