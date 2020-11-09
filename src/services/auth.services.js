import Anon from '../model/anon.model'
import { createToken, handleServerResponse, checkPassword } from '../utils'

export const signup = async (req, res) => {
  // const { name, username, password, email } = req.body

  try {
    const anonExist = await Anon.countDocuments({ username: req.body.username })
    if (anonExist) return res.status(409).send('Username already exists')
    const anon = await new Anon(
      req.body
    ).save()
    const token = createToken({
      username: anon.username,
      id: anon._id
    })

    handleServerResponse(res, {
      message: 'signup successful',
      payload: {
        token
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal server error')
  }
}

export const login = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const anon = await Anon.findOne({ $or: [{ username }, { email }] })
    if (!anon) return res.status(404).send('Incorrect login credentials, please try again')
    if (!checkPassword(password, anon.password)) return handleServerResponse(res, 'incorrect login credentials', 401)
    const token = createToken({
      username: anon.username,
      id: anon._id
    })
    handleServerResponse(res, {
      message: 'login successful',
      payload: token
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal server error')
  }
}
