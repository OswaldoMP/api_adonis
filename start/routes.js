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


// Route.group(()=>{
//   Route.get('/','UserController.index')//ver todo
//   Route.post('/','UserController.store')//crear
//   Route.get('/:id','UserController.show')//ver uno
//   Route.put('/:id','UserController.update')//editar
//   Route.delete('/:id','UserController.destroy')
// }).prefix('api/v1/users');


Route.resource('api/v1/users','UserController').apiOnly();
Route.resource('api/v1/inventories','InventorieController').apiOnly();
Route.resource('api/v1/products','ProductController').apiOnly();