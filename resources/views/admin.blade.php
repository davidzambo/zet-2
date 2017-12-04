<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Zámbó és Társa Bt.</title>
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div class="container-fluid px-0 mx-0" id="root"></div>
        <script src="{{mix('js/bootstrap.js')}}" ></script>
        <script src="{{mix('js/administration.js')}}" ></script>
    </body>
</html>
