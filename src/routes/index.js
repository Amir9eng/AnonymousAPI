import { Router } from 'express'
import { signup, login } from '../services/auth.services'
import { signupPolicy, loginPolicy, messagePolicy } from '../policies'
import {message} from '../services'

const router = Router()

router.post('/signup', signupPolicy, signup)
router.post('/login', loginPolicy, login)
router.post('/messages',messagePolicy,message)

export default router
