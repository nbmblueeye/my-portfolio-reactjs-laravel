<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class HomeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title'        => 'required|string',
            'sub_title'    => 'required|string',
            'message'      => 'required|string',
            'image'        => 'nullable|string',
            'facebook_url' => 'required|string',
            'linkedin_url' => 'required|string',
            'instagram_url'=> 'required|string',
            'youtube_url'  => 'required|string',
            'button_text'  => 'required|string',
            'button_url'   => 'required|string',
        ];
    }
}
