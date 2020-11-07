import { handleServerResponse } from "../utils"
import Anon from '../model/anon.model'

export const message = async(req,res) => {
    
    const {q} = req.query
    if(!q) return handleServerResponse(res, 'error loading Page',404,'yes,emi ni error nah')
      try {
        let anon = await Anon.findOne({ passKey:q })
        if(!anon) return handleServerResponse(res, 'error submitting',400)
       anon.message.push({text:req.body.message})
       anon = await anon.save()
       handleServerResponse(res, 'success👍',200,anon.message[0])
      } catch (error) {
        handleServerResponse(res,'internal server error', 500,error)
      }

}