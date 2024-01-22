<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset PassWord</title>
</head>
<style>
    a{
        text-decoration: none;
    }
</style>
<body>
    <h4>Hello {{$data->email}}!</h4>
    <p>You're receiving this email because we received a Reset PassWord request for your account</p>
    <p>Please click below button to go to reset PassWord field</p>

    <button type="button"><a href="{{env('APP_URL_BASE')}}{{URL::temporarySignedRoute('password.reset', now()->addMinutes(30), ['token' => $data->token, 'email' => $data->email], false);}}" target="_blank">Click Button below to verify your Email</a></button>

    <p>This Password reset Link will be expired in 30 minutes</p>
    <p>If You didn't request a Password Reset, no further action is required</p>
    <h5>Regards,</h5>
</body>
</html>