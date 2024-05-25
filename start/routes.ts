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

Route.group(() => {
    Route.resource('/location', 'LocationsController')
    Route.post('/locationByLatLong', 'LocationsController.show')
    Route.resource('/history', 'HistorysController')
    Route.resource('/handling', 'PenanganansController')
    Route.resource('/photo', 'PhotosController')
    Route.resource('/video', 'VideosController')
    // Route.resource('/location/:locationId/comments', 'CommentsController')
    // Route.get('/locations/:locationId/comments', 'CommentsController.index')

    
}).middleware(['auth'])

Route.get('/locations/:locationId/comments', 'CommentsController.index')
  Route.post('/locations/:locationId/comments', 'CommentsController.store')
  Route.get('/comments/:id', 'CommentsController.show')
  Route.put('/comments/:id', 'CommentsController.update')
  Route.delete('/comments/:id', 'CommentsController.destroy')
// Route.resource('/location', 'LocationsController')
// Route.resource('/history', 'HistorysController')
// Route.resource('/penanganan', 'PenanganansController')
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.get('/find-road-damage', 'FindRoadDamagesController.index')
Route.post('/find-road-damage', 'FindRoadDamagesController.index')

