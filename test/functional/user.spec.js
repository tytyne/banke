const { test, trait } = use('Test/Suite')('Account')
const Account = use('App/Models/Account')

trait('Test/ApiClient')

test('get list of accounts', async ({ client }) => {
  await Account.create({
    NID: '123',
    type: 'saving'
  })

  const response = await client.get('/accounts').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    NID: '123',
    type: 'saving'
  }])
})