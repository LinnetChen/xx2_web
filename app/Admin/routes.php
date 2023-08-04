<?php

use Illuminate\Routing\Router;

Admin::routes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
    'as'            => config('admin.route.prefix') . '.',
], function (Router $router) {

    $router->get('/', 'HomeController@index')->name('home');
    $router->resource('/prereg_user', 'prereg\PreregUserController');
    $router->resource('/draw_card_chance_log', 'prereg\DrawCardChanceLogController');
    $router->resource('/panda_guess_log', 'prereg\PandaGuessLogController');

});