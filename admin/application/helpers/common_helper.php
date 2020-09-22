<?php

function checkLoginSession()
{
    $ci = & get_instance();
    $var_session = $ci->session->userdata();
    if(isset($var_session['isUserLoggedIn']) && $var_session['isUserLoggedIn']==TRUE)
    {
        return true;
    }
    else
    {
        return false;
    }
}

?>