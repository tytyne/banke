'use strict'

const User = use('App/Models/User')

class UserController {
    // creating and saving a new user (sign-up)
    async signup ({ request, response }) {
      
        // getting data passed within the request
        const needs = request.only(['username', 'email', 'password'])
  
        // looking for user in database

        const users = await User.findBy('email', needs.email)
        
  
        // // if user exists don't save
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        
  
        // if user doesn't exist, proceeds with saving him in DB
        const user = await User.create(needs)
  
        return user
      } 
    }
  
module.exports = UserController
