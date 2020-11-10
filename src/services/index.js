import { handleServerResponse } from '../utils'
import Anon from '../model/anon.model'

export const addMessage = async (req, res) => {
  const { username } = req.params
  // console.log({ username })
  if (!username) {
    return handleServerResponse(res, '"username" must be passed via parameters', 400, 'no username!')
  }

  try {
    const anon = await Anon.findOne({ username })
    if (!anon) return handleServerResponse(res, `username "${username}" not found`, 404)

    anon.messages.push({ text: req.body.message })
    await anon.save()

    // handleServerResponse(res, 'success👍', 201)
    handleServerResponse(res, {
      message: 'success👍',
      payload: {
        anon
      }
    })
  } catch (err) {
    handleServerResponse(res, 'internal server error', 500, err)
  }
}
