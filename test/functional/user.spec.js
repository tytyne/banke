'use strict'

// const { test } = use('Test/Suite')('User')

// test('make sure 2 + 2 is 4', async ({ assert }) => {
//   assert.equal(2 + 2, 4)
// })


const Factory = use('Factory');
const {test, trait} = use('Test/Suite')('Accounts')

trait('Test/ApiClient')
trait('Auth/Client')


test('can create account', async ({assert, client}) => {

  const user = await Factory.model('App/Models/User').create()

  const data = {
      NID: 'Test NID',
      type: 'Test type'

  };

  const response = await client.account('/accounts')
    .loginVia(user, 'jwt')
    .send(data).end()

  response.assertStatus(200);
  response.assertJSONSubset({
    NID: data.NID,
    type: data.type,
    user_id: user.id,
    accountName:user.name,
  })
})

test('can list account', async ({assert, client}) => {

  const user = await Factory.model('App/Models/User').create()
  const account = await Factory.model('App/Models/Account').make()

  await user.accounts().save(account)
  const response = await client.get('/accounts').end()


  response.assertStatus(200);

  response.assertJSONSubset(
    [{
      NID: account.NID,
      type: account.type,
      user_id: user.id,
      accountName:user.name,
    }]
  )

})



