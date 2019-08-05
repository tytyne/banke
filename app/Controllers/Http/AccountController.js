'use strict'
const Account = use('App/Models/Account')
const User = use('App/Models/User')
class AccountController {
    
    async account({response,request,params,auth}){
        const rules = {
            NID: 'required',
            type: 'required'
          }
        const validation = await validate(request.all(), rules);
        if (validation.fails()) return response.json(validation)

        const randomNumber = Math.floor(Math.random() * 20) + 123456789
        let user= await User.findBy('id',params.id)
        if (user.id!== Number(params.id)) response.status(400).send('incorrect id of user')
        const accounts = request.only(['NID','type'])
        let accountp = await Account.findBy('NID', accounts.NID)
        if(accountp) return response.status(400).send({message:{error:'the account is already registered'}})
        const account = new Account()
        account.type =accounts.type
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
