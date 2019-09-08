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


// WEB
Route.group(() => {
    Route.on('/signup').render('auth.signup');
    Route.post('/signup', 'UserController.create').validator('CreateUser');
    Route.on('/login').render('auth.login');
    Route.post('/login', 'UserController.login').validator('LoginUser');
}).middleware('guest');

Route.group(() => {
    Route.get('/', 'SiteController.home')
    Route.get('/users', 'UserController.index')
    Route.get('/info', 'UserController.info')
    Route.get('/logout', async ({ auth, response }) => {
        await auth.logout();
        return response.redirect('/');
    });
}).middleware('webAuth');

// API
Route.group(() => {

    // oAuth
    Route.post('oauth2/token', 'TokenController.create');
    
    // User
    Route.get('/users', 'UserController.index')
    Route.post('/users', 'UserController.create').validator('CreateUser');
    Route.get('/me', 'UserController.info')

})
.prefix("/api/v1")
.middleware('auth');

// This has to be the last route
// Route.any('*', ({view}) =>  view.render('app'))
// Route.any('*', ({view}) =>  view.render('app')).middleware('auth')
