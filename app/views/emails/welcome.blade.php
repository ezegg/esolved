<!DOCTYPE html>
<html>
<head>
<!-- If you delete this tag, the sky will fall on your head -->
<meta name="viewport" content="width=device-width" />

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Bienvenido a Sistema de Control de Gestión</title>
	
<link rel="stylesheet" type="text/css" href="{{ asset('css/normalize.css') }}"/>
<link rel="stylesheet" href="{{ asset('bootstrap-3.2.0/css/bootstrap.min.css') }}">
<link href="{{ asset('css/dash.css') }}" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="{{ asset('css/buttons.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('css/animate.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('css/utils.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('css/font-awesome.min.css') }}" />

</head>

<style>
	.img{
		background-image: url({{asset('img/incan.jpg')}});
	}
	.black{
		background-color: black;
		color: white;
	}

	

</style>

<body>
	<div id="picture"></div>
	<h1>Misty Background <br> Experiment</h1>
	<div id="layer2"></div>
	<div id="layer1"></div>

	<header class="img" style="background-image:url({{asset('img/incan.jpg')}})">
        <div class="container">
            <div class="intro-text">
                <div class="intro-lead-in black">Bienvenido al Sistema de Gestión INCan <p>{{ $first_name }}</p></div>
                <div class="intro-heading black">Un gusto tenerte con nosotros</div>
                <a href="#services" class="page-scroll btn btn-xl">@ezeezegg</a>
            </div>
        </div>
    </header>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="{{ asset('bootstrap-3.2.0/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('bootstrap-3.2.0/js/docs.min.js') }}"></script>
</body>
</html>
