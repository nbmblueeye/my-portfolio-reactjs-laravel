<?php

namespace App\Http\Requests\Admin\Qualification;

use Illuminate\Foundation\Http\FormRequest;

class QualificationDetailRequest extends FormRequest
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
            'qualification_item_id' => 'required|integer',
            'title'                 => 'required|string|max:100',
            'link'                  => 'nullable|string',
            'description'           => 'nullable|string',
            'image'                 => 'nullable|string',
        ];
    }
}
