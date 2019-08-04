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
Route.post('/account/:id','AccountController.account').middleware('auth')
Route.post('/transaction/:id','TransactionController.transaction').middleware('auth')
Route.get('/transactions/:id','TransactionController.transa').middleware('auth')
// Route.get('/onetransa/:id/one/date','TransactionController.onetransa')
Route.get('/onetransaction/:id','TransactionController.onetransaction').middleware('auth')
Route.put('/debit/account/:accountNumber/transaction/:id','StaffController.debit').middleware(['auth','staff'])
Route.put('/credit/account/:accountNumber/transaction/:id','StaffController.credit').middleware(['auth','staff'])
Route.get('/staff/user/:id','StaffController.user').middleware(['auth','staff'])
Route.get('/staff/users','StaffController.users').middleware(['auth','staff'])
Route.put('/staff/deactivate/:id','StaffController.deactivate').middleware(['auth','staff'])
Route.put('/staff/activate/:id','StaffController.activate').middleware(['auth','staff'])
Route.delete('/staff/delete/:id','StaffController.delete').middleware(['auth','staff'])
Route.get('/admin/user/:id','AdminController.user').middleware(['auth','admin'])
Route.get('/admin/users','AdminController.users').middleware(['auth','admin'])
Route.put('/admin/deactivate/:id','AdminController.deactivate').middleware(['auth','admin'])
Route.put('/admin/activate/:id','AdminController.activate').middleware(['auth','admin'])
Route.delete('/admin/delete/:id','AdminController.delete').middleware(['auth','admin'])
Route.post('/admin/register/staff','AdminController.staff').middleware(['auth','admin'])
Route.post('/admin/register/admin','AdminController.admin').middleware(['auth','admin'])