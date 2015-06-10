

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
  <link rel="stylesheet" type="text/css" href="{{ asset('css/font-awesome.min.css') }}" />
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
                          <img src="https://d13yacurqjgara.cloudfront.net/users/3139/screenshots/1015141/email_id_1x.jpg" class="login" height="70">
                          <h3 class="text-center">Olvide mi contraseña</h3>
                          <p>Si olvidaste tu contraseña solo ingresa tu email</p>
                            <div class="panel-body">
                              
                              {{ Form::open(['route' => 'sendMailRecovery', 'method' => 'POST', 'role' => 'form']) }}
                                <fieldset>
                                  <div class="form-group">
                                    <div class="input-group">
                                      <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                      <!--EMAIL ADDRESS-->
                                      <input id="emailInput" placeholder="Email " class="form-control" type="email" name="email">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <input class="btn btn-lg btn-primary btn-block" value="Recuperar Contraseña" type="submit">
                                  </div>
                                </fieldset>
                              {{ Form::close() }}

                              <p>Revisa tu email</p>
                              
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
