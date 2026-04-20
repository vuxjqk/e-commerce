<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'images' => 'required',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public');

                $product->images()->create(['path' => $path]);
            }
        }

        return back()->with('success', 'Thêm ảnh thành công');
    }

    public function setMain(Image $image)
    {
        $image->product->images()->update(['is_main' => false]);
        $image->update(['is_main' => true]);
        return back()->with('success', 'Đã thay đổi ảnh chính');
    }

    public function destroy(Image $image)
    {
        Storage::disk('public')->delete($image->path);
        $image->delete();
        return back()->with('success', 'Xóa ảnh thành công');
    }
}
