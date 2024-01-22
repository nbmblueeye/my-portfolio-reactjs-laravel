<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\RoleController;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Admin\HomeController;
use App\Http\Controllers\Api\Admin\PostController;
use App\Http\Controllers\Api\Admin\AboutController;
use App\Http\Controllers\Api\Admin\SkillController;
use App\Http\Controllers\Api\Admin\MyBlockController;

use App\Http\Controllers\Api\Admin\CkEditorController;
use App\Http\Controllers\Api\Admin\ParallaxController;
use App\Http\Controllers\Api\Admin\AboutItemController;

use App\Http\Controllers\Api\Admin\PortfolioController;
use App\Http\Controllers\Api\Admin\SkillItemController;

use App\Http\Controllers\Api\Admin\WebSettingController;
use App\Http\Controllers\Api\FrontEnd\CommentController;
use App\Http\Controllers\Api\FrontEnd\FrontEndController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\FrontEnd\UserProfileController;
use App\Http\Controllers\Api\Admin\CustomerCommentController;

use App\Http\Controllers\Api\Admin\PortfolioButtonController;
use App\Http\Controllers\Api\Admin\Services\ServiceController;
use App\Http\Controllers\Api\Auth\EmailVerificationController;
use App\Http\Controllers\Api\FrontEnd\VisitorMessageController;
use App\Http\Controllers\Api\Admin\Services\ServiceItemController;
use App\Http\Controllers\Api\Admin\Qualification\QualificationController;
use App\Http\Controllers\Api\Admin\Qualification\QualificationItemController;
use App\Http\Controllers\Api\Admin\Qualification\QualificationDetailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function(){

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/logout', [AuthController::class, 'Logout']);

    Route::controller(UserProfileController::class)->group(function(){
        Route::get('/profiles', 'index');
        Route::post('/profiles/update', 'update');
    });
    
   
    Route::post('/post/comment', [CommentController::class, 'saveComment']);
    Route::delete('/post/comment/{comment_id}', [CommentController::class, 'destroy']);
    Route::post('/comment/upvoted', [CommentController::class, 'setUpvoted']);
    
    Route::post('/front-end/visitor/message', [VisitorMessageController::class, 'store']);
    Route::get('/notification', [VisitorMessageController::class, 'getUnreadMessage']);

    Route::put('/notification/{mess_id}', [VisitorMessageController::class, 'markAsRead']);
    Route::delete('/notification/{user_id}/{mess_id}', [VisitorMessageController::class, 'deleteMessage']);


});

Route::prefix('/admin')->middleware(['auth:sanctum', 'Admin_Field'])->group(function(){

    Route::get('', function (Request $request) {
        return $request->user();
    });

    Route::controller(RoleController::class)->group(function(){
        Route::post('/roles', 'store');
        Route::get('/roles', 'index');
        Route::get('/role/{role_id}', 'show');
        Route::put('/roles/{role_id}', 'update');
        Route::delete('/roles/{role_id}', 'destroy');
    });

    Route::controller(UserController::class)->group(function(){
        Route::get('/users', 'index');
        Route::post('/users', 'store');
        Route::get('/users/{user_id}', 'show');
        Route::put('/users/{user_id}', 'update');
        Route::delete('/users/{user_id}', 'destroy');
    });
 
    Route::controller(HomeController::class)->group(function(){
        Route::get('/homes', 'index');
        Route::post('/homes', 'store');
        Route::get('/homes/{home_id}', 'show');
        Route::put('/homes/{home_id}', 'update');
        Route::delete('/homes/{home_id}', 'destroy');
    });

    Route::controller(AboutController::class)->group(function(){
        Route::get('/abouts', 'index');
        Route::post('/abouts', 'store');
        Route::get('/abouts/{about_id}', 'show');
        Route::put('/abouts/{about_id}', 'update');
        Route::delete('/abouts/{about_id}', 'destroy');
    });

    Route::controller(AboutItemController::class)->group(function(){
        Route::get('/about-items', 'index');
        Route::post('/about-items', 'store');
        Route::get('/about-items/{about_item_id}', 'show');
        Route::put('/about-items/{about_item_id}', 'update');
        Route::delete('/about-items/{about_item_id}', 'destroy');
    });

    Route::controller(SkillController::class)->group(function(){
        Route::get('/skills', 'index');
        Route::post('/skills', 'store');
        Route::get('/skills/{skill_id}', 'show');
        Route::put('/skills/{skill_id}', 'update');
        Route::delete('/skills/{skill_id}', 'destroy');
    });

    Route::controller(SkillItemController::class)->group(function(){
        Route::get('/skill-items', 'index');
        Route::post('/skill-items', 'store');
        Route::get('/skill-items/{skill_item_id}', 'show');
        Route::put('/skill-items/{skill_item_id}', 'update');
        Route::delete('/skill-items/{skill_item_id}', 'destroy');
    });

    Route::controller(QualificationController::class)->group(function(){
        Route::get('/qualifications', 'index');
        Route::post('/qualifications', 'store');
        Route::get('/qualifications/{qualification_id}', 'show');
        Route::put('/qualifications/{qualification_id}', 'update');
        Route::delete('/qualifications/{qualification_id}', 'destroy');
    });

    Route::controller(QualificationItemController::class)->group(function(){
        Route::get('/qualification_items', 'index');
        Route::post('/qualification_items', 'store');
        Route::get('/qualification_items/{qualification_item_id}', 'show');
        Route::put('/qualification_items/{qualification_item_id}', 'update');
        Route::delete('/qualification_items/{qualification_item_id}', 'destroy');
    });

    Route::controller(QualificationDetailController::class)->group(function(){
        Route::get('/qualification_details', 'index');
        Route::post('/qualification_details', 'store');
        Route::get('/qualification_details/{qualification_detail_id}', 'show');
        Route::put('/qualification_details/{qualification_detail_id}', 'update');
        Route::delete('/qualification_details/{qualification_detail_id}', 'destroy');
    });

    Route::controller(ServiceController::class)->group(function(){
        Route::get('/services', 'index');
        Route::post('/services', 'store');
        Route::get('/services/{service_id}', 'show');
        Route::put('/services/{service_id}', 'update');
        Route::delete('/services/{service_id}', 'destroy');
    });

    Route::controller(ServiceItemController::class)->group(function(){
        Route::get('/service_items', 'index');
        Route::post('/service_items', 'store');
        Route::get('/service_items/{service_item_id}', 'show');
        Route::put('/service_items/{service_item_id}', 'update');
        Route::delete('/service_items/{service_item_id}', 'destroy');
    });

    Route::controller(PortfolioController::class)->group(function(){
        Route::get('/portfolios', 'index');
        Route::post('/portfolios', 'store');
        Route::get('/portfolios/{portfolio_id}', 'show');
        Route::put('/portfolios/{portfolio_id}', 'update');
        Route::delete('/portfolios/{portfolio_id}', 'destroy');
    });

    Route::controller(PortfolioButtonController::class)->group(function(){
        Route::get('/portfolio-buttons', 'index');
        Route::post('/portfolio-buttons', 'store');
        Route::get('/portfolio-buttons/{portfolio_button_id}', 'show');
        Route::put('/portfolio-buttons/{portfolio_button_id}', 'update');
        Route::delete('/portfolio-buttons/{portfolio_button_id}', 'destroy');
    });

  
    Route::controller(ParallaxController::class)->group(function(){
        Route::get('/parallax', 'index');
        Route::post('/parallax', 'store');
    });

    Route::controller(CustomerCommentController::class)->group(function(){
        Route::get('/customer-comments', 'index');
        Route::post('/customer-comments', 'store');
        Route::get('/customer-comments/{customer_comment_id}', 'show');
        Route::put('/customer-comments/{customer_comment_id}', 'update');
        Route::delete('/customer-comments/{customer_comment_id}', 'destroy');
    });

    Route::controller(PostController::class)->group(function(){
        Route::get('/posts', 'index');
        Route::post('/posts', 'store');
        Route::get('/posts/{post_id}', 'show');
        Route::put('/posts/{post_id}', 'update');
        Route::delete('/posts/{post_id}', 'destroy');
    });

    Route::controller(MyBlockController::class)->group(function(){
        Route::get('/my-block', 'index');
        Route::post('/my-block', 'store');
    });

});

//Admin Settings
Route::post('/admin/settings/add', [WebSettingController::class, 'Setting']);
Route::get('/admin/settings', [WebSettingController::class, 'Index']);

Route::controller(AuthController::class)->group(function(){
    Route::post('/register', 'Register');
    Route::post('/login', 'Login');
});


Route::controller(ForgotPasswordController::class)->group(function(){
    Route::post('/forgot-password', 'sendEmail');
    Route::get('/reset-password/{token}', 'showResetPasswordForm')->name('password.reset');
    Route::post('/reset-password', 'resetPassword');
});

Route::post('/ckeditor/upload', [CkEditorController::class, 'uploadFile']);

Route::controller(FrontEndController::class)->group(function(){
    Route::get('/index', 'index');
    Route::get('/my-blocks', 'myBlocks');
    Route::get('/my-posts', 'gePosts');
    Route::get('/my-posts/{post_slug}', 'gePost');
});

Route::get('/comment/upvoted/{comment_id}', [CommentController::class, 'getUpvoted']);
Route::get('/post/comment/{post_id}', [CommentController::class, 'index']);
Route::get('/admin/visitor/messages', [VisitorMessageController::class, 'index']);
Route::get('/add/view/{post_slug}', [FrontEndController::class, 'addView']);

