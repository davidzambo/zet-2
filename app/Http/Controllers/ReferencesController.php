<?php

namespace App\Http\Controllers;

use App\References;
use Illuminate\Http\Request;

class ReferencesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\References  $references
     * @return \Illuminate\Http\Response
     */
    public function show(References $references)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\References  $references
     * @return \Illuminate\Http\Response
     */
    public function edit(References $references)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\References  $references
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, References $references)
    {
      // echeck if a new picture will be uploaded
          if (!empty($request->file('files'))) {
            // store the original Picture
            $file = $request->file('image');
            $fileName = time().hash("sha256", $file->getClientOriginalName());
            $fileExt = $file->getClientOriginalExtension();
            $filePath = "images/" . date('Y') . "/" . date('m') . "/";

            $original = $filePath . $fileName . '.' . $fileExt;
            $file->storeAs($filePath, $fileName.'.'.$fileExt);

            // create thumbnail from the original
            $thumb = Image::make($original)->resize(200, null, function($constraint){
              $constraint->aspectRatio();
            });

            // store thumbnail
            $thumbnail = $filePath . $fileName . '-thumnb.' . $fileExt;
            $thumb->save($thumbnail);

            // create display from the original
            $disp = Image::make($original)->resize(800, null, function($constraint){
              $constraint->aspectRatio();
            });

            // store display
            $display = $filePath . $fileName . '-disp.' . $fileExt;
            $disp->save($display);

            $oldPic = Picture::where(['user_id' => $user->id, 'isProfile' => true])->first();

            // Check if there is any old picture
            if (isset($oldPic)){
              Storage::delete([$oldPic->thumbnail, $oldPic->display, $oldPic->original]);
            }


            // create new entry @ Pictures
            $picture = Picture::updateOrCreate(
              [ 'user_id' => $user->id ],
              [
                'user_id' => $user->id,
                'isProfile' => true,
                'original' => $original,
                'thumbnail' => $thumbnail,
                'display' => $display
              ]);
          }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\References  $references
     * @return \Illuminate\Http\Response
     */
    public function destroy(References $references)
    {
        //
    }
}
