@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center my-5">
        <div class="col-md-6">
            <div class="card card-default">
                <div class="card-header">
                  Bejelentkezés az adminisztrációs felületre
                </div>
                <div class="card-body">
                    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                          <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="control-label">E-mail:</label>

                            <div class="form-group">
                              <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>
                            </div>
                            @if ($errors->has('email'))
                            <div class=" form-group alert alert-danger p-2">
                              <strong>{{ $errors->first('email') }}</strong>
                            </div>
                            @endif
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="control-label">Jelszó</label>

                            <div class="form-group">
                                <input id="password" type="password" class="form-control" name="password" required>
                            </div>
                                @if ($errors->has('password'))
                                <div class=" form-group alert alert-danger p-2">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Emlékezz rám
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col ">
                                <button type="submit" class="btn btn-primary ml-auto">
                                    Belépés
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
