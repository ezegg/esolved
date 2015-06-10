<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sistema de Control de Gestión</title>  
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/normalize.css') }}"/>
  <link rel="stylesheet" href="{{ asset('bootstrap-3.2.0/css/bootstrap.min.css') }}">
  <link rel="stylesheet" href="{{ asset('css/utils.css') }}">
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
  {{ HTML::style('assets/css/signin.css') }}
</head>
<body>
  
  <div class="container center " style="background-image:url({{asset('img/incan.jpg')}})">
    <div class="row">
      <div class="fluid center">
        {{ Form::open(['url' => 'login', 'autocomplete' => 'off', 'class' => 'form-signin', 'role' => 'form']) }}

        <h2 class="form-signin-heading center">Sistema de Control de Gestión</h2>

        {{ Form::label('username', 'Username', ['class' => 'sr-only']) }}
        {{ Form::text('username', null, ['class' => 'form-control', 'placeholder' => 'Username', 'autofocus' => '']) }}
        </br>
        {{ Form::label('password', 'Password', ['class' => 'sr-only']) }}
        {{ Form::password('password', ['class' => 'form-control', 'placeholder' => 'Contraseña']) }}
        </br>
        </br>
        <div class="checkbox">
          <label>
            {{ Form::checkbox('remember', true) }} Recuerdame
          </label>
        </div>
        <p class="center">
        {{ Form::submit('Iniciar Sesión', ['class' => 'btn btn-primary ']) }}
        </p>

        {{ Form::close() }}
        <!--<a class="btn btn-success" href="{{ action('AuthController@registerUser') }}">Create User</a>-->
        <a class="btn btn-success center" href="{{ action('UserController@showPassRecovery') }}">Olvide mi contraseña</a>
        @if(Session::has('error_message'))
          <div class="alert alert-danger">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            {{ Session::get('error_message') }}
        @endif
        </div>
        </br>
        </br>
        </br>
        </br>
        </br>
      </div>
    </div>
    
  </div>
  <script src="//code.jquery.com/jquery.js"></script>
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</body>
</html>
