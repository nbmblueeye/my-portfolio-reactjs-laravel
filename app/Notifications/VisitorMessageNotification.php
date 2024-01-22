<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VisitorMessageNotification extends Notification
{
    use Queueable;
    public $information;

    /**
     * Create a new notification instance.
     */
    public function __construct($information)
    {
        $this->information = $information;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = env('APP_URL_BASE');

        return (new MailMessage)->subject('My Portfolio - Leaving Message')->markdown('mails.visitor_message', ['user_name' => $this->information['user_name'], 'messageTitle' => $this->information['messageTitle'], 'url' => $url]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'user_name' => $this->information['user_name'],
            'messageTitle'  => $this->information['messageTitle'],
            'message'       => $this->information['message'],
        ];
    }
}
