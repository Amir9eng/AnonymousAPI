import { model, Schema } from 'mongoose'

const anonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
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

module.exports = model('Anon', anonSchema)
