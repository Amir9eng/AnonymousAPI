import Joi from "joi"
import { handleServerResponse } from "../utils"




export const signupPolicy = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    username: Joi.string().alphanum().min(2).required(),
    email: Joi.string().email(),
    password: Joi.string().min(5).required()
  })

  const { error } = schema.validate(req.body)

  

  if (error) return handleServerResponse(res, error.details[0].message, 400,error)

  next()
} 

export const loginPolicy = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(2),
    email: Joi.string().email(),
    password: Joi.string().min(5).required()
  })
  const { error } = schema.validate(req.body)
  if (error) return handleServerResponse(res, error.details[0].message, 400, error)

  if (!req.body.email && !req.body.username) return handleServerResponse(res, '"username" or "email" is required')
  

  next()
}

export const messagePolicy = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().required().min(5)
    
  })
  const { error } = schema.validate(req.body)
  
  if (error) return handleServerResponse(res, error.details[0].message, 400, error)

  next()
}
