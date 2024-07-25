<?php

namespace App\Filters;

use Essa\APIToolKit\Filters\QueryFilters;

class CityFilters extends QueryFilters
{
    protected array $allowedFilters = ['name'];

    protected array $columnSearch = ['name'];
}
