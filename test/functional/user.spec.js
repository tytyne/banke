// const { test, trait } = use('Test/Suite')('Account')

// const Account = use('App/Models/Account')

// trait('Test/ApiClient')

// test('get list of accounts', async ({ client }) => {

//   await Account.create({
//     NID: '123',
//     type: 'saving',
//     accountName:'flora',
//     accountNumber:'123'
//   })

//   const response = await client.get('/admin/users')
//   .type('json')
//   .accept('json')
//   .end()

//   response.assertStatus(200)
//   response.assertJSONSubset([{
    
//     NID: '123',
//     type: 'saving',
//     accountName:'flora',
//     accountNumber:'123'
//   }])
// })
'use strict'

const { test, trait } = use('Test/Suite')('Users')
const User = use('App/Models/User')
const  Account = use('App/Models/Account')

trait('Test/ApiClient')
// trait('Session/Client')
trait('Auth/Client')

test('get list of logged users', async ({ client }) => {
  const user = await User.find(1)

  const response = await client
  .get('admin/users')
  .loginVia(user,'jwt')
  .end()

response.assertStatus(403) 
console.log(response)
})
test('delete account', async ({ client }) => {
  const account = await Account.find(1)

  const response = await client
  .delete('/admin/delete/:id')
  .loginVia(account)
  .end()

response.assertStatus(403) 
console.log(response)
})

