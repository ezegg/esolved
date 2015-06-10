@if (Session::has('error'))
{{ trans(Session::get('reason')) }}
@endif

@if(Session::has('error_message'))
<div class="alert alert-danger">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
  {{ Session::get('error_message') }}
</div>
@endif
{{ Form::open(array('route' => array('resetPass', $token)))  }}

<p>{{ Form::label('email', 'Email') }}
  {{ Form::text('email') }}</p>

  <p>{{ Form::label('password', 'Password') }}
    {{ Form::text('password') }}</p>

    <p>{{ Form::label('password_confirmation', 'Password confirm') }}
      {{ Form::text('password_confirmation') }}</p>

      {{ Form::hidden('token', $token) }}

      <p>{{ Form::submit('Submit') }}</p>

      {{ Form::close() }}


<div class="container">
    <div class="row">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">
                          <img src="https://cloud.digitalocean.com/assets/cloud-logo-0efc9110ac89b1ea38fc7ee2475a3e87.svg" class="login" height="70">
                          <h3 class="text-center">Forgot Password?</h3>
                          <p>If you have forgotten your password - reset it here.</p>
                            <div class="panel-body">
                              
                              <form class="form"><!--start form--><!--add form action as needed-->
                                <fieldset>
                                  <div class="form-group">
                                    <div class="input-group">
                                      <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                      <!--EMAIL ADDRESS-->
                                      <input id="emailInput" placeholder="email address" class="form-control" type="email" oninvalid="setCustomValidity('Please enter a valid email address!')" onchange="try{setCustomValidity('')}catch(e){}" required="">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <input class="btn btn-lg btn-primary btn-block" value="Send My Password" type="submit">
                                  </div>
                                </fieldset>
                              </form><!--/end form-->
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>