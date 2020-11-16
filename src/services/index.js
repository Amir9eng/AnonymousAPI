import { handleServerResponse, decodeToken } from '../utils'
import Anon from '../model/anon.model'

export const validateToken = async (req, res, next) => {
  let token = req.headers.Authorization || req.headers['x-access-token'] || req.headers.token || req.body.token

  if (!token) return handleServerResponse(res, 'Authentication is required!', 401)

  try {
    const decoded = await decodeToken(token)
    req.decoded = decoded
    // console.log({ decoded })

    next()
  } catch (err) {
    if (err.name && err.name === 'JsonWebTokenError') {
      return handleServerResponse(res, err.message, 401)
    }
    handleServerResponse(res, 'authentication error', 401, err)
  }
}
