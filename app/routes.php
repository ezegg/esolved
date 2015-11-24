<?php

/*define response for route not exist*/
App::missing(function($exception)
{
    return Response::view('missing', array(), 404);
});
/*define response for route not exist*/


/*Controls of auth*/
Route::get('login', 'AuthController@showLogin');
Route::post('login', 'AuthController@postLogin');
Route::get('logout', 'AuthController@logout');

 //show view new user
Route::post('sign-up', ['as' => 'register', 'uses' => 'UserController@register' ] );//register new user

Route::get('passRecovery', 'UserController@showPassRecovery');

Route::post('password/reset', ['as' => 'sendMailRecovery', 'uses' => 'UserController@sendMailRecovery' ] );

Route::get('password/reset/{token}', ['as' => 'showResetPass', 'uses' => 'UserController@showResetPass' ] );
Route::post('password/reset/{token}', ['as' => 'resetPass', 'uses' => 'UserController@resetPass' ] );

//Route::post('uploadImage', ['as' => 'uploadImage', 'uses' => 'UserController@uploadImage' ] );


/*private routes only for users auth*/
Route::group(['before' => 'auth'], function()
{
	Route::get('/', 'HomeController@showWelcome');
	Route::get('showRegister', 'AuthController@registerUser');

	Route::get('dash', 'AuthController@showWelcome');

	Route::post('updateUser', ['as' => 'updateUser', 'uses' => 'UserController@updateUser' ] );

	Route::post('uploadImage', ['as' => 'uploadImage', 'uses' => 'UserController@uploadImage' ] );

	Route::post('createClass', ['as' => 'createClass', 'uses' => 'MateriaController@createClass' ] );
  Route::get('getClassesByAdministrador', 'MateriaController@getClassesByAdministrador');
  Route::get('deleteClass/{id}', 'MateriaController@deleteClass');


	Route::get('getUsers', 'UserController@getUsers');
	Route::get('getTasks', 'TareasController@getTasks');
	Route::get('getTasksSuperAdmin', 'TareasController@getTasksSuperAdmin');
	Route::get('listUsers', 'UserController@listUsers');
	Route::get('deleteUser/{id}', 'UserController@deleteUser');
	Route::post('uploadpdf', ['as' => 'uploadpdf', 'uses' => 'TareasController@uploadpdf' ] );
	Route::get('cleanDD', ['as' => 'cleanDD', 'uses' => 'TareasController@cleanDD' ] );
	Route::get('deleteTask/{id}', ['as' => 'deleteTask', 'uses' => 'TareasController@deleteTask' ] );
	Route::get('getTaskDetailsById/{id}', ['as' => 'getTaskDetailsById', 'uses' => 'TareasController@getTaskDetailsById' ] );
	Route::post('updateTask/{id}', ['as' => 'updateTask', 'uses' => 'TareasController@updateTask' ] );
	Route::post('sendRejectTask', ['as' => 'sendRejectTask', 'uses' => 'TareasController@sendRejectTask' ] );
	Route::get('search', ['as' => 'search', 'uses' => 'TareasController@search' ] );


	//Route::post('uploadImage', 'UserController@uploadImage');
});
