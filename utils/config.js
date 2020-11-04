require('dotenv').config()

module.exports = {
  port: process.env.PORT || 4040,
  url: process.env.DB_URL
}
