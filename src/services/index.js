import { handleServerResponse } from '../utils'
import Anon from '../model/anon.model'
import { text } from 'express'

export const addMessage = async (req, res) => {
  const { username } = req.query
  console.log({ username })
  if (!username) {
    return handleServerResponse(res, '"username" must be passed via query', 400, 'no username!')
  }

  try {
    const anon = await Anon.findOne({ username })
    if (!anon) return handleServerResponse(res, `Anon "${username}" not found`, 404)

    anon.messages.push({ text: req.body.message })
    await anon.save()

    handleServerResponse(res, 'success👍', 201)
  } catch (err) {
    handleServerResponse(res, 'internal server error', 500, err)
  }
}
