<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class WebSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'logo'          => 'nullable|string',
            'websiteName'   => 'required|string',
            'websiteUrl'    => 'required|string',
            'websiteDescription' => 'nullable|string',
            'pageTitle'     => 'required|string',
            'metaKeywords'  => 'required|string',
            'metaDes'       => 'required|string',
            'address'       => 'required|string',
            'phoneNo1'      => 'required|numeric|min:9',
            'phoneNo2'      => 'nullable|numeric|min:9',
            'emailNo1'      => 'required|email',
            'emailNo2'      => 'nullable|email',
            'facebook'      => 'nullable|string',
            'linkedin'      => 'nullable|string',
            'instagram'     => 'nullable|string',
            'youtube'       => 'nullable|string',
        ];
    }
}
