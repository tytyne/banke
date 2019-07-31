'use strict'


const User = use('App/Models/User')

class AuthController {

    async login({request, auth, response}) {

        const {email, password} = request.all();

          if (await auth.attempt(email, password)) {
            const user = await User.findBy('email', email)
            const token = await auth.generate(user)

            Object.assign(user, token)
            return response.json(user)
          }

        
      }

}

module.exports = AuthController
