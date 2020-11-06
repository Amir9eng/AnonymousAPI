import { handleServerResponse } from "../utils"
import Anon from '../model/anon.model'

export const message = async(req,res) => {
    
    const {q} = req.query
    if(!q) return handleServerResponse(res, 'error loading Page',404,'yes,emi ni error nah')
      try {
        const anon = await Anon.findOne({ passKey:q })
        if(!anon) return handleServerResponse(res, 'error submitting',400)
       let newMessage = anon.message.push(req.body.message)
       newMessage = await newMessage.save()
       handleServerResponse(res, 'success👍')
      } catch (error) {
        handleServerResponse(res,'internal server error', 500,error)
      }

}