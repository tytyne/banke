'use strict'
const { validate } = use('Validator');
const User = use('App/Models/User')


class UserController {
    // creating and saving a new user (sign-up)
    async signup ({ request, response }) {

        const rules = {
          username: 'required',
          email: 'required|email',
          // password: 'required|min:4|in:abcde,efghij',
          password:'required|min:4',
        }
        const validation = await validate(request.all(), rules);

        if (validation.fails()) return response.json(validation)
        const needs = request.only(['username', 'email', 'password'])
               const users = await User.findBy('email', needs.email)

        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
      
        const user = await User.create(needs)
  
        return user
      } 
    }
  
module.exports = UserController
