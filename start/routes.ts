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
    Route.resource('/penanganan', 'PenanganansController')
    Route.resource('/photo', 'PhotosController')
    Route.resource('/video', 'VideosController')
}).middleware('auth')

// Route.resource('/location', 'LocationsController')
// Route.resource('/history', 'HistorysController')
// Route.resource('/penanganan', 'PenanganansController')
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
