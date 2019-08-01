'use strict'
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction')
const User = use('App/Models/User')
class AdminController {

    async users({response,request}){
        const account = await Account.all()
        response.json(account)
    }
    async user({response,request,params}){
      const account = await Account.findBy('id',params.id)
      if(!user) return response.status(400).send('user does not exist')
      response.json(account)
    }
    async activate({response,request,params}){
        const account = await Account.findBy('id',params.id)
        if(!account) return response.status(400).send('the account is not registered')
        account.status='active'
        await account.save()
        response.json({message:'account activate'})
    }
    async deactivate({response,request,params}){
        const account = await Account.findBy('id',params.id)
        if(!account) return response.status(400).send('the account is not registered')
        account.status='dormant'
        await account.save()
        response.json({message:'account deactivate'})
    }
    async delete({response,request,params}){
        const account = await Account.findBy('id',params.id)
        if(!account) return response.status(400).send('the account is not registered')
        await account.delete()
        response.json({message:'the account is deleted successful'})
     
     }
    async staff ({ request, response }) {
        const needs = request.only(['username', 'email', 'password'])
        const users = await User.findBy('email', needs.email)
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        const user = new User()
        user.username=needs.username
        user.email=needs.email
        user.password = needs.password
        user.isStaff =true
        await user.save()
        return response.json(user)
  
    
    } 

    async admin ({ request, response }) {
        const needs = request.only(['username', 'email', 'password'])
        const users = await User.findBy('email', needs.email)
        if (users) return response.status(400).send({ message: { error: 'User already registered' } })
        const user = new User()
        user.username = needs.username
        user.email=needs.email
        user.password = needs.password
        user.isAdmin =true
        await user.save()
        return response.json(user)
  
    
    } 
    
}

module.exports = AdminController
