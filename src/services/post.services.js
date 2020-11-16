import { handleServerResponse } from "../utils"
import Anon from '../model/anon.model'

export const addMessage = async (req, res) => {
  const { username } = req.params
  // console.log({ username })
  if (!username) {
    return handleServerResponse(res, '"username" must be passed via parameters', 400, '!no username')
  }
  // console.log(err)

  try {
    const anon = await Anon.findOne({ username }, "email")
    if (!anon) return handleServerResponse(res, `username "${username}" not found`, 404)

    await Anon.findByIdAndUpdate(anon.id, { $push: { messages: { text: req.body.message } } })

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

export const getMessage = async (req, res) => {
  const { id } = req.decoded

  try {
    const messages = await Anon.findById(id, 'messages')

    handleServerResponse(res, {
      payload: {
        messages
      }
    })
  } catch (err) {
    handleServerResponse(res, 'error fetching messages', 500, err)
  }
}