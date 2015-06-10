<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>INCAN Sistema de Control de Gestión</title>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/normalize.css') }}"/>
  <link rel="stylesheet" href="{{ asset('bootstrap-3.2.0/css/bootstrap.min.css') }}">
  <link href="{{ asset('css/dash.css') }}" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/buttons.css') }}"/>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/animate.css') }}"/>
  <link rel="stylesheet" type="text/css" href="{{ asset('css/utils.css') }}"/>
  <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
  
</head>
<body>
<div class="container">
    <div class="row">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">
                          <img src="https://d13yacurqjgara.cloudfront.net/users/76269/screenshots/796352/express_password.png" class="login" height="70">
                          <h3 class="text-center">Recupera tu contraseña</h3>
                            <div class="panel-body">

                              {{ Form::open(array('route' => array('resetPass', $token)))  }}

                                <p>{{ Form::label('email', 'Email') }}
                                  {{ Form::text('email') }}</p>

                                <p>{{ Form::label('Nueva Contraseña', 'Nueva Contraseña') }}
                                   {{ Form::password('password') }}</p>

                                <p>{{ Form::label('password_confirmation', 'Confirmar Contraseña') }}
                                   {{ Form::password('password_confirmation') }}</p>

                                   {{ Form::hidden('token', $token) }}

                                <div class="form-group">
                                    <input class="btn btn-lg btn-primary btn-block" value="Guardar Contraseña" type="submit">
                                </div>

                              {{ Form::close() }}
                                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="{{ asset('bootstrap-3.2.0/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('bootstrap-3.2.0/js/docs.min.js') }}"></script>

</html>
