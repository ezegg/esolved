<?php

class UserController extends BaseController {

  public function register()
  {
     
    $data = Input::only(['first_name', 'last_name', 'username', 'email', 'password']);

    $rules = array(
      'first_name'  => 'required',
      'last_name'   => 'required',
      'username'    => 'required|unique:users',
      'email'       => 'required|unique:users',
      'password'    => 'required'
    );
  
    $messages = array(
      'first_name.required'  => 'El Nombre es obligatorio',
      'last_name.required'   => 'Los Apellidos son obligatorios.',
      'username.required'    => 'El Username esobligatorio.',
      'email.required'       => 'El Email es obligatorio.',
      'password.required'    => 'La Contraseña es obligatoria.',
      'username.unique'      => 'Ya existe este Username, por favor elige otro.',
      'email.unique'         => 'Ya existe este Email, por favor elige otro.'
    );
   
    $validation = Validator::make($data, $rules, $messages);
   
    if ($validation->fails())
    {
        //var_dump('error');
        return Redirect::to('dash')->withErrors($validation);
 
    }else{
      
      $newUser = User::create($data);

      $role = Input::get('role');

      if ($role == 1 ) {
        $newUser->makeRole('super_admin');
      }
      else {
       $newUser->makeRole('admin'); 
      }

      Mail::send('emails.welcome', array('first_name'=>Input::get('first_name')), function($message){
        $message->to(Input::get('email'), Input::get('first_name').' '.Input::get('last_name'))->subject('Bienvenido al Sistema de Gestión Incan');
      });

      if($newUser){
        //Auth::login($newUser);
        return Redirect::to('dash');
      }

      return Redirect::route('showRegister')->withInput();

    }
  }

  public function account()
  {
    $user = Auth::user();
    return View::make('users/account',compact('user'));
  }

  public function updateUser()
  {
    $id = Input::get('id');
    $user = User::find($id);
    $data = Input::all();
    $user->fill($data);
    $user->save();

    Mail::send('emails.updateInfo', array('first_name'=>Input::get('first_name')), function($message){
      $message->to(Input::get('email'), Input::get('first_name').' '.Input::get('last_name'))->subject('Succes update');
    });

    return View::make('auth/dash');
  }

  public function showPassRecovery()
  {
    return View::make('passRecovery');
  }

  public function sendMailRecovery()
  {
    $credentials = array('email' => Input::get('email'));
    Password::remind($credentials);
    return Redirect::to('login');
  }

  public function showResetPass($token)
  {
    return View::make('reset')->with('token', $token);
  }

  public function resetPass()
  {
    $credentials = Input::only("email","password","password_confirmation","token");

    $response = Password::reset($credentials, function($user, $password)
    {
      //$user->password = Hash::make($password);not is necesary make hash in model user setPasswordAttribute make .it
      $user->password = $password;
      $user->save();

      Mail::send('emails.successResetPassword', array('email'=>Input::get('email')), function($message){
        $message->to(Input::get('email'))->subject('Succes recovery password');
      });

    });

    switch ($response)
    {
      case Password::INVALID_PASSWORD:
      case Password::INVALID_TOKEN:
      case Password::INVALID_USER:
      return Redirect::back()->with('error_message', Lang::get($response));

      case Password::PASSWORD_RESET:
      return Redirect::to('login');
    }

  }

  public function uploadImage()
  {
    $id = Input::get('id');
    $user = User::find($id);
    $data = Input::only("avatar");
    $user->fill($data);
    $user->save();
    return View::make('auth/dash');
  }

  public function getUsers()
  {
    $users = DB::table('users')->get(['id', 'first_name', 'email', 'username']);
    return Response::json(array(
      'users' =>  $users
    ));
  }

  public function listUsers()
  {
    $users = DB::table('users')->where('id','!=', Auth::user()->id)->get(['id', 'first_name', 'email', 'username']);
    return Response::json(array(
      'users' =>  $users
    ));
  }

  public function deleteUser($id){
    //var_dump($id);
    $user = User::find($id);
    $user->delete();
  }

}
