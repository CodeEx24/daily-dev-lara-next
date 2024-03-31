<?php

use App\Events\PostBroadCastEvent;
use App\Events\PostCommentCountEvent;
use App\Events\TestEvent;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\UserController;
use App\Models\Post;
use Illuminate\Broadcasting\BroadcastEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::post("/auth/logout", [AuthController::class, 'logout']);
    Route::post("/update/profile", [UserController::class, 'updateProfileImage']);

    Route::apiResources([
        "post" => PostController::class,
        "comment" => CommentController::class
    ]);
});

Route::post("/auth/register", [AuthController::class, 'register']);
Route::post("/auth/login", [AuthController::class, 'login']);
Route::post("/auth/checkCredentials", [AuthController::class, 'checkCredentials']);


Route::post("/test/channel", function () {
    // $post = Post::select("*")->with("user")->orderByDesc("id")->first();

    // TestEvent::dispatch($post);
    // PostBroadCastEvent::dispatch($post);
    PostCommentCountEvent::dispatch(13);
    return response()->json(["message" => "Data sent to client"]);
});


Broadcast::routes(["middleware" => ["auth:sanctum"]]);
