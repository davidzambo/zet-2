<?php

namespace App\Http\Controllers;

use App\References;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;


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
      
      foreach ($request->readedFiles as $file){

        $media = $this->getMediaData($file);

        switch($media["mime"]){
          case 'image':
              $this->storeImage($media, $request->category);
              break;
          case 'video':
              $this->storeVideo($media, $request->category);
              break;
          default:
              return 'Unknown filetype';
        }
      }

      return response()
                ->json([
                  'method' => 'store',
                  'references' => References::all()
                ]);
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
        echo 'update';
        // // store the original Picture
        // $file = $request->file('image');
        // $fileName = time().hash("sha256", $file->getClientOriginalName());
        // $fileExt = $file->getClientOriginalExtension();
        // $filePath = "images/" . date('Y') . "/" . date('m') . "/";
        //
        // $original = $filePath . $fileName . '.' . $fileExt;
        // $file->storeAs($filePath, $fileName.'.'.$fileExt);
        //
        // // create thumbnail from the original
        // $thumb = Image::make($original)->resize(200, null, function($constraint){
        //   $constraint->aspectRatio();
        // });
        //
        // // store thumbnail
        // $thumbnail = $filePath . $fileName . '-thumnb.' . $fileExt;
        // $thumb->save($thumbnail);
        //
        // // create display from the original
        // $disp = Image::make($original)->resize(800, null, function($constraint){
        //   $constraint->aspectRatio();
        // });
        //
        // // store display
        // $display = $filePath . $fileName . '-disp.' . $fileExt;
        // $disp->save($display);
        //
        // $oldPic = Picture::where(['user_id' => $user->id, 'isProfile' => true])->first();
        //
        // // Check if there is any old picture
        // if (isset($oldPic)){
        //   Storage::delete([$oldPic->thumbnail, $oldPic->display, $oldPic->original]);
        // }
        //
        //
        // // create new entry @ Pictures
        // $picture = Picture::updateOrCreate(
        //   [ 'user_id' => $user->id ],
        //   [
        //     'user_id' => $user->id,
        //     'isProfile' => true,
        //     'original' => $original,
        //     'thumbnail' => $thumbnail,
        //     'display' => $display
        //   ]);
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


    private function getMediaData($base64){
        // decode the base64 image
        // SAMPLE : data:image/jpeg;base64,/9j/4R...

        $split = explode(';' , $base64);

        $meta = explode('/', substr($split[0],5));

        return $media = array(
          "base64" => $base64,
          "raw_data" => substr($split[1], 7),
          "mime" => $meta[0],
          "ext" => $meta[1]
        );
    }


    private function storeImage($media, $category){

        $folder = public_path().'/uploads';
      
        // SAMPLE : data:image/jpeg;base64,/9j/4R...
        $file_name = time().str_random(30);
        
        
        // store base picture
        $base_img_path = $folder . '/' . $file_name . '.' . $media["ext"];
        Image::make(file_get_contents( $media["base64"]) )->save( $base_img_path );

        // create and store thumbnail
        $thumbnail_img_path = $folder . '/' . $file_name . '_thumbnail.' . $media["ext"];
        Image::make(file_get_contents($media["base64"]))
                ->resize(200, null, function($constraint){
                    $constraint->aspectRatio();
                 })
                ->save( $thumbnail_img_path );
       
        // create and store display size
        $display_img_path = $folder . '/' . $file_name . '_display.' . $media["ext"];
        Image::make(file_get_contents($media["base64"]))
                ->resize(800, null, function($constraint){
                    $constraint->aspectRatio();
                 })
                ->save( $display_img_path );

        // store in the database
        References::create([
          "category_id" => $category,
          "thumbnail" => $file_name . '_thumbnail.' . $media["ext"],
          "display" => $file_name . '_display.' . $media["ext"],
          "original" => $file_name . '.' . $media["ext"]
        ]);

    }

    
    private function storeVideo($media, $category){
      $folder = public_path().'/uploads';
      $file_name = time().str_random(30);

      $video_path = $folder . '/' . $file_name . '.' . $media["ext"];
      file_put_contents($video_path, $media["raw_data"]);
      
      // store in the database
      References::create([
        "category_id" => $category,
        "thumbnail" => $file_name . '.' . $media["ext"],
        "display" => $file_name . '.' . $media["ext"],
        "original" => $file_name . '.' . $media["ext"]
      ]);

    }

  }
