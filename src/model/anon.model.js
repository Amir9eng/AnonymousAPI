import { model, Schema } from 'mongoose'
import { hashPassword, uid } from '../utils'


const anonSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passKey: {
    type:String,
    default:uid,
    index:true
  },
  email: String,
  message: [{
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
},
 { timestamps: true }
 ) 

 anonSchema.pre('save', function(next) {
   const anon = this

   if (anon.isModified('password')) {
     anon.password = hashPassword(anon.password)
   }

   next()
 })

module.exports = model('Anon', anonSchema)
