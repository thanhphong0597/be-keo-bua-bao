/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return [{ 'a': 'b' }, { 'hello': 'world' }];
})

Route.group(() => {
  Route.post('register', 'UsersController.register')
  Route.post('login', 'UsersController.login')
  Route.get('getAll', 'UsersController.getAll')
}).prefix('users')



Route.group(() => {
  Route.get('join/:id', 'MatchesController.matchJoin')
  Route.get('create', 'MatchesController.matchCreate')
  Route.get('find/:id', 'MatchesController.matchFind')
  Route.get(`allMatch`, `MatchesController.allMatch`)
  Route.get(`allStartedMatch`, `MatchesController.allStartedMatch`)
}).prefix('matches')
  .middleware(['userWho'])

Route.group(() => {
  Route.post(`updateRound/:id`, `RoundsController.updateRound`)
}).prefix('rounds')
  // .middleware(['userWho'])


