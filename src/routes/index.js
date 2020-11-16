import { Router } from 'express'
import { signup, login } from '../services/auth.services'

import { signupPolicy, loginPolicy, messagePolicy } from '../policies'
import { validateToken } from '../services'
import { getMessage, addMessage } from '../services/post.services'



const router = Router()

router.post('/signup', signupPolicy, signup)
router.post('/login', loginPolicy, login)
router.post('/:username', messagePolicy, addMessage)
router.get('/messages', validateToken, getMessage)

export default router
