<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class References extends Model
{
    protected $fillable = ['user_id', 'thumbnail', 'display', 'original', 'category_id'];
}
