<?php

namespace Modules\Store\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class StoreNavbarSetting extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        "paragraph",
        "color",
        "link",
        "is_active",
    ];

}