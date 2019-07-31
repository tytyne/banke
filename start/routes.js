'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('users', 'UserController.signup')
Route.post('auth', 'AuthController.login')
Route.post('/account/:id','AccountController.account')//.middleware('auth')
Route.post('/transaction/:id','TransactionController.transaction')
Route.get('/transactions/:id','TransactionController.transa')
// Route.get('/onetransa/:id/one/date','TransactionController.onetransa')
Route.get('/hell/:id','TransactionController.onetransaction')
Route.put('/debit/account/:accountNumber/transaction/:id','StaffController.debit')
Route.put('/credit/account/:accountNumber/transaction/:id','StaffController.credit')
Route.get('/staff/user/:id','StaffController.user')
Route.get('/staff/users','StaffController.users')
Route.put('/staff/deactivate/:id','StaffController.deactivate')
Route.put('/staff/activate/:id','StaffController.activate')
Route.delete('/staff/delete/:id','StaffController.delete')
Route.get('/admin/user/:id','AdminController.user')
Route.get('/admin/users','AdminController.users')
Route.put('/admin/deactivate/:id','AdminController.deactivate')
Route.put('/admin/activate/:id','AdminController.activate')
Route.delete('/admin/delete/:id','AdminController.delete')