<?php

namespace App;

enum ProjectStatus: string
{
    case Pending = 'pending';
    case Ongoing = 'ongoing';
    case Completed = 'completed';
    case OnHold = 'on-hold';
}
