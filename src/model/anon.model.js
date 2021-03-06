import { model, Schema } from 'mongoose'
import { hashPassword } from '../utils'

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
  email: {
    type: String,
    required: true
  },
  messages: [{
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
},
{ timestamps: true }
)

anonSchema.pre('save', function (next) {
  const anon = this

  if (anon.isModified('password')) {
    anon.password = hashPassword(anon.password)
  }

  next()
})

export default model('Anon', anonSchema)
