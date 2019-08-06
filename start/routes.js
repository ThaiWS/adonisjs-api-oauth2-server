'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('index')
Route.group(() => {
    Route.on('/signup').render('auth.signup');
    Route.post('/signup', 'UserController.create').validator('CreateUser');
    Route.on('/login').render('auth.login');
    Route.post('/login', 'UserController.login').validator('LoginUser');
}).middleware('guest');

Route.group(() => {
    Route.get('/', 'SiteController.home').middleware('webAuth');
    Route.get('/users', 'UserController.index')
    Route.get('/logout', async ({ auth, response }) => {
        await auth.logout();
        return response.redirect('/');
    });
}).middleware('webAuth');

Route.group(() => {
    Route.get('/users', 'UserController.index')
    Route.post('/users', 'UserController.create').validator('CreateUser');
}).prefix("/api/v1");

// This has to be the last route
// Route.any('*', ({view}) =>  view.render('app')).middleware('auth')
