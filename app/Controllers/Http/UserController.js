'use strict'
// import { validate } from 'indicative/validator'
const User = use('App/Models/User')


class UserController {
    // creating and saving a new user (sign-up)
    async signup ({ request, response }) {

    
        // const rules = {
        //   username: 'required',
        //   email: 'required|email',
        //   password: 'required|min:4',
        // }
        // const messages = {
        //   required: (field) => `${field} is required`,
        //   'email.email': 'Please enter a valid email address',
        //   'password.min': 'Password is too short',
        // }

        const needs = request.only(['username', 'email', 'password'])
        // validate(needs,rules,messages)
        const users = await User.findBy('email', needs.email)

        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
      
        const user = await User.create(needs)
  
        return user
      } 
    }
  
module.exports = UserController
