<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body>
    <h4>Hello {{$user->name}}!</h4>
    <p>You're receiving this email because we received a request to register new Account</p>
    <p>Please click below button to verify your Email register</p>

    <button type="button"><a href="{{env('APP_URL_BASE')}}{{URL::temporarySignedRoute('verification.verify', now()->addMinutes(30), ['user_id' => $user->id], false);}}" target="_blank">Click Button below to verify your Email</a></button>

    <p>This Email Verify Link will be expired in 30 minutes</p>
    <p>If You didn't request to register new Account, no further action is required</p>
    <h5>Regards,</h5>
</body>
</html>