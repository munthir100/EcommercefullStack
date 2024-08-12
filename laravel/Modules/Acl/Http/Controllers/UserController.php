<?php

namespace Modules\Acl\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Admin\Transformers\UserResource;

class UserController extends Controller
{
    public function getAuthentcatedUser()
    {
        $user = new UserResource(request()->user());

        return $this->responseSuccess(data: ['user' => $user]);
    }
}
