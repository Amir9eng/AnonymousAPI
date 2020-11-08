import { Router } from 'express'
import { signup, login } from '../services/auth.services'
import { signupPolicy, loginPolicy, messagePolicy } from '../policies'
import { addMessage } from '../services'

const router = Router()

router.post('/signup', signupPolicy, signup)
router.post('/login', loginPolicy, login)
router.post('/message', messagePolicy, addMessage)

export default router
