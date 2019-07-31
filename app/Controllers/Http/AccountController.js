'use strict'
const Account = use('App/Models/Account')
const User = use('App/Models/User')
class AccountController {
    async account({response,request,params}){
    const randomNumber = Math.floor(Math.random() * 20) + 123456789
    let user= await User.findBy('id',params.id)
    if (user.id!== Number(params.id)) response.status(400).send('incorrect id of user')
    const accounts = request.only(['NID'])
    let accountp = await Account.findBy('NID', accounts.NID)
    if(accountp) return response.status(400).send({message:{error:'the account is already registered'}})
    const account = new Account()
    account.accountName = user.username
    account.NID = accounts.NID
    account.accountNumber = randomNumber
    account.toObject()
   
    await account.save()
    await account.reload();
    return response.json(account)
      
    }
}

module.exports = AccountController
