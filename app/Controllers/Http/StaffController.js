'use strict'
const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction')
const User = use('App/Models/User')
class StaffController {

async credit({response,request,params}){
    const account=await Account.findBy('accountNumber',params.accountNumber)
    if(!account) return response.status(400).send('Invalid account')
    const transaction = await Transaction.findBy('id',params.id)
    if(!transaction) return response.status(400).send('Invalid transaction')
    if(transaction.transactionName == 'deposit') return response.status(200).send('you are not allowed this transaction');
    account.amount=parseInt(account.amount) + parseInt(transaction.amount);
    account.status='active';
    await account.save();
    response.json({
        message: 'Account credited ',
        amount: account.amount
    });

}
async debit({response,request,params}){
    const account=await Account.findBy('accountNumber',params.accountNumber)
    if(!account) return response.status(400).send('Invalid account')
    const transaction = await Transaction.findBy('id',params.id)
    if(!transaction) return response.status(400).send('Invalid transaction')
    if(transaction.TransactionName !== "withdraw" && transaction.amount > account.amount) return response.status(400).send('Cannot debit account');
    account.amount=parseInt(account.amount)-parseInt(transaction.amount);
    await account.save()
    response.json({
        message: 'Account debited ',
        amount: account.amount
    })

}

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
    if(account) return response.status(400).send('the account is not registered')
    account.status='active'
    await account.save()
    response.json({message:'account activate'})
}
async deactivate({response,request,params}){
    const account = await Account.findBy('id',params.id)
    if(account) return response.status(400).send('the account is not registered')
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

}

module.exports = StaffController
