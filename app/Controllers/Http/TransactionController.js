'use strict'

const Account = use('App/Models/Account')
const Transaction = use('App/Models/Transaction')
class TransactionController {

    async transaction({request,response,params}){

        const  account = await Account.findBy('id',params.id)
        if(!account) return response.status(400).send('the id of account does not exist')
        let needs = request.only(['transactionName','accountNumber','amount','accountName','transactionDate'])
        if(account.accountNumber!== needs.accountNumber) return response.status(400).send('the account  does not exist')
        if(account.accountName!==needs.accountName) return response.status(400).send('the account name is incorrect')
        const transaction = new Transaction()
        transaction.transactionName= needs.transactionName
        transaction.accountNumber= needs.accountNumber
        transaction.amount=needs.amount
        transaction.accountName= needs.accountName
        transaction.transactionDate=needs.transactionDate
        await transaction.save()
        return response.json(transaction)

    }

    async transa({request,response,params}){
        // view all transactions
        const account = await Account.findBy('id',params.id)
        if(!account) response.status(400).send('the account does  not exist')
        let transactions = await Transaction.all()
        return response.json(transactions)

    }
    // async onetransa({request,response,params}){
    //     // view specific transaction
        
    //     const account =await Account.findBy('id',params.id)
    //     if(!account) response.status(400).send('the account does not exist')
    //     var dater="CREATE TABLE trial(start DATE)"
    //     dater = request.only(['start'])
    //     let transaction =  await Transaction.query().today().fetch();
    //     if(!dater.start== transaction.transactionDate) return response.status(400).send('you did not make any transaction on this date')
        
    //     return response.json(transaction)
       
    // }
    async onetransaction({request,response,params}){
        // view specific transaction
        // const account=await Account.findBy('id',params.id);
        // if(!account) return response.status(400).send('the account does not exist');
        const transaction = await Transaction.findBy('id',params.id)
        if(!transaction) return  response.status(400).send('you are not allowed to this transaction')
        return response.json(transaction)

    }



}

module.exports = TransactionController
