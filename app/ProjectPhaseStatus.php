<?php

namespace App;

enum ProjectPhaseStatus: string
{
     case Draft = 'draft';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case OnHold = 'on_hold';
    case Cancelled = 'cancelled';
}
