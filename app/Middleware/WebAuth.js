'use strict'

class WebAuth {
  async handle ({ auth, request, response }, next) {
    
    if(!auth.user){
      return response.redirect('/login')
    }

    await next()

  }
}

module.exports = WebAuth