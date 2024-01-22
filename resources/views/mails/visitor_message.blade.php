<x-mail::message>

Dear {{ucfirst($user_name)}},

Thank you for sent your message "{{$messageTitle}}"
<br>
We will get back to you soon!

<x-mail::button :url="$url">
Button Text
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
