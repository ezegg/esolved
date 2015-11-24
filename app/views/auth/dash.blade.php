<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>esolved</title>
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

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Management Class</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <!--<li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li>
              <div>
                  <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav pull-right">
                      <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                          <span class="icon icon-wh i-profile">{{ Auth::user()->username }} </span><span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">

                          <li><a onclick="showView('updateUser','ocultar')">Editar usuario</a></li>
                          <li><a href="{{ action('AuthController@logout') }}">Salir</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
              <div>
            </li>-->
            @if(Auth::check())
              <li><a href="#">{{ Auth::user()->first_name }}</a></li>
              <li><a href="#" onclick="showView('updateUser','ocultar')">Profile</a></li>
              <li><a href="{{ action('AuthController@logout') }}">Logout</a></li>
            @endif
          </ul>

        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li  id="liMain" class="active lis">
              <a href="#" onclick="showView('main','ocultar');addClassActive('liMain','lis')"><i class="fa fa-tasks"></i> class available<span class="sr-only">(current)</span></a>
            </li>
            @if (Auth::user()->hasRole('administrador'))
            <li id="liAsignarTarea" class="lis" onclick="addClassActive('liAsignarTarea','lis')">
              <a href="#" onclick="showView('createClass','ocultar');addClassActive('liAsignarTarea','lis')"><i class="fa fa-thumb-tack"></i> Create class</a>
            </li>
            <li id="liRegistrarUsuario" class="lis">
              <a href="#" onclick="showView('registrarUsuario','ocultar');addClassActive('liRegistrarUsuario','lis')"><i class="fa fa-user-plus"></i> Create Users</a>
            </li>
            <li id="liListarUsuarios" class="lis">
              <a href="#" onclick="showView('listarUsuarios','ocultar');addClassActive('liListarUsuarios','lis')"><i class="fa fa-users"></i> Listar Usuarios</a>
            </li>
            <!--<li id="liLimpiarEspacio" class="lis">
              <a href="#" onclick="showView('limpiarEspacio','ocultar');addClassActive('liLimpiarEspacio','lis')">Limpiar DD</a>
            </li>-->
            @endif
            <!--<li><a href="#">favorites</a></li>
            <li><a href="#">Recommended</a></li>-->
          </ul>

        </div>

        <div id="main" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar">
          <div class="container-fluid">

            <h3 class="page-header page-header col-md-8">Hi</h3>

            <div class="col-md-4 container-fluid top">
              {{ Form::open(['route' => 'search', 'method' => 'GET', 'files' => true,'role' => 'form', 'class' => 'col-md-7']) }}
                {{ Form::text('search', '' , ['id' => 'search', 'class' => 'form-control', 'placeholder' => 'Buscar']) }}
              {{ Form::close() }}
              <p class="col-md-5">
                <input type="button" value="Buscar " class="btn btn-success" onclick="search();">
              </p>
            </div>
          </div>
          @if (Auth::user()->hasRole('administrador'))
            <table class="table table-hover">
              <thead>
                <tr>
                  <th class="center">Name Class</th>
                  <th class="center">Credits</th>
                  <th class="center">Start Date</th>
                  <th class="center">End Date</th>
                  <th class="center"></th>
                  <th class="center"></th>
                  <th class="center"></th>

                </tr>
              </thead>
              <tbody id="classesAministrador" style="font-size:12px;">

              </tbody>
            </table>
          @endif
          @if (Auth::user()->hasRole('admin'))
            <table class="table table-hover">
              <thead>
                <tr>
                  <th class="center">Folio</th>
                  <th class="center">Oficio Referencia </th>
                  <th class="center">Asunto</th>
                  <th class="center">Asignado a</th>
                  <th class="center">Semáforo</th>
                  <th class="center"></th>
                  <th class="center"></th>

                </tr>
              </thead>
              <tbody id="tasks" style="font-size:12px;">

              </tbody>
            </table>
          @endif
        </div>

        <section id="updateUser" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar spin" style="display:none" >
          <div class="container-fluid center">
            </br>
            </br>
            <img class="img-circle" src="{{asset(Auth::user()->avatar->url('thumb')) }}" >

            {{ Form::open(['route' => 'uploadImage', 'method' => 'POST', 'files' => true,'role' => 'form']) }}
              {{ Form::hidden('id', Auth::user()->id ) }}
              {{ Form::file('avatar') }}
              <input type="submit" value="Subir imagen" class="btn btn-success">
            {{ Form::close() }}

            </br>

            {{ Form::open(['route' => 'updateUser', 'method' => 'POST', 'role' => 'form']) }}

              {{ Form::hidden('id', Auth::user()->id ) }}

              {{ Form::label('first_name', 'FirtsName', ['class' => 'sr-only']) }}
              {{ Form::text('first_name', Auth::user()->first_name , ['class' => 'form-control', 'placeholder' => 'Nombre', 'autofocus' => '']) }}


              {{ Form::label('last_name', 'Last Name', ['class' => 'sr-only']) }}
              {{ Form::text('last_name', Auth::user()->last_name , ['class' => 'form-control', 'placeholder' => 'Apellidos', 'autofocus' => '']) }}

              {{Form::text('email', Auth::user()->email ,['class' => 'form-control', 'placeholder' => 'Email', 'autofocus' => ''])}}

              {{ Form::label('password', 'Password', ['class' => 'sr-only']) }}
              {{ Form::password('password', ['class' => 'form-control', 'placeholder' => 'Contraseña']) }}

            <p>
              <input type="submit" value="Actualizar" class="btn btn-success">
            </p>
            {{ Form::close() }}
          </div>
        </section>

      <section id="createClass" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar spin" style="display:none" >

        <div class="container top">
          <div class="row">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <div class="panel panel-default">
                    <div class="panel-body">

                      @if ($errors->any())
                        <div class="alert alert-danger">
                          <button type="button" class="close" data-dismiss="alert">&times;</button>
                          <strong>Please fix the errors</strong>
                          <ul>
                          @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                          @endforeach
                          </ul>
                        </div>
                      @endif

                      {{ Form::open(['route' => 'createClass', 'method' => 'POST', 'role' => 'form','files' => true]) }}

                        </br>
                        {{ Form::label('Name Class', 'Name Class')}}
                        {{ Form::text('nombre','', ['id' => 'nombre', 'class' => 'form-control', 'placeholder' => 'Nombre', 'autofocus' => '']) }}
                        </br>
                        {{ Form::label('Credits', 'Credits')}}
                        {{ Form::text('creditos','', ['id' => 'creditos', 'class' => 'form-control', 'placeholder' => 'creditos', 'autofocus' => '']) }}
                        </br>
                        {{ Form::label('Start Date', 'Start Date')}}
                        {{ Form::custom('hora_inicio', 'time', 'hora_inicio') }}

                        </br>
                        {{ Form::label('End Date', 'End Date')}}
                        {{ Form::custom('hora_fin', 'time', 'hora_fin') }}
                        <p class="center">
                          <input type="submit" value="Save Class" class="btn btn-success">
                        </p>
                      {{ Form::close() }}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </section>
      <!--Vista que te permite crear un usuario-->
      <section id="registrarUsuario" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar spin" style="display:none" >
        <div class="container top">
          <div class="row">
              <div class="row">
                <div class="col-md-4 col-md-offset-4">
                  <div class="panel panel-default">
                    <div class="panel-body">
                      @if ($errors->any())
                        <div class="alert alert-danger">
                          <button type="button" class="close" data-dismiss="alert">&times;</button>
                          <strong>Por favor corrige los siguentes errores:</strong>
                          <ul>
                          @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                          @endforeach
                          </ul>
                        </div>
                      @endif

                      {{ Form::open(['route' => 'register', 'method' => 'POST', 'role' => 'form']) }}


                      {{ Form::label('Nombre', 'Nombre')}}
                      {{ Form::text('first_name', null, ['class' => 'form-control', 'placeholder' => 'Nombre', 'autofocus' => '']) }}

                      {{ Form::label('Apellidos', 'Apellidos')}}
                      {{ Form::text('last_name', null, ['class' => 'form-control', 'placeholder' => 'Apellidos', 'autofocus' => '']) }}

                      {{ Form::label('Username', 'Username')}}
                      {{ Form::text('username', null, ['class' => 'form-control', 'placeholder' => 'Username', 'autofocus' => '']) }}

                      {{ Form::label('Email', 'Email')}}
                      {{Form::text('email', null,['class' => 'form-control', 'placeholder' => 'Email', 'autofocus' => ''])}}

                      {{ Form::label('password', 'password')}}
                      {{ Form::password('password', ['class' => 'form-control', 'placeholder' => 'Contraseña']) }}

                      <div class="checkbox">
                        <label>
                          {{ Form::checkbox('role', '1') }} Es administrador
                      </div>

                      <p class="center">
                        <input type="submit" value="Registrar Usuario" class="btn btn-success">
                      </p>
                      {{ Form::close() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <!--Vista lista los usuarios-->
      <section id="listarUsuarios" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar" style="display:none" >
        <div class="fluid top">

         <table class="table table-hover">
            <thead>
              <tr>
                <th>id </th>
                <th>Nombre </th>
                <th>Email</th>
                <th>Username</th>
                <th></th>

              </tr>
            </thead>
            <tbody id="listUsers">

            </tbody>
          </table>
        </div>
      </section>

      <!--Limpiar Espacio en Disco Duro-->
      <!--<section id="limpiarEspacio" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar spin" style="display:none" >
          <div class="col-md-4 col-md-offset-4">

            <div onclick="cleanDD()">Limpiar</div>
        </div>
      </section>-->

      <!--Ver detalle tarea-->
      <section id="verDetalleTarea" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar spin" style="display:none" >
          <div class="fluid">

            <div id="detailsTask">

            </div>



        </div>
      </section>

      <!--Ver detalle tarea-->
      <section id="rechazarTarea" class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ocultar spin" style="display:none" >
        <div class="fluid">
          <div id="showRejectTask"></div>

        </div>
      </section>

      </div>
    </div>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="{{ asset('bootstrap-3.2.0/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('bootstrap-3.2.0/js/docs.min.js') }}"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script src="{{ asset('js/dash.js') }}"></script>
<script src="{{ asset('js/spin.min.js') }}"></script>
<script src="{{ asset('js/date.format.js') }}"></script>
<script src="{{ asset('js/jquery-dateFormat.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/noty/packaged/jquery.noty.packaged.min.js') }}"></script>
<script src="{{ asset('js/notyConfigurations.js') }}"></script>

</html>
