<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->when($request->search, function ($q, $search) {
                $q->whereAny(['name', 'slug'], 'LIKE', "%$search%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $brands = Brand::all();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'brands' => $brands,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255|unique:products,name',
            'slug' => 'required|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        Product::create($validated);

        return back()->with('success', 'Thêm sản phẩm thành công');
    }

    public function show(Product $product)
    {
        $product->load('images');
        $brands = Brand::all();
        return Inertia::render('admin/products/show', compact('product', 'brands'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'name' => 'required|string|max:255|unique:products,name,' . $product->id,
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
        ]);

        $product->update($validated);

        return back()->with('success', 'Cập nhật sản phẩm thành công');
    }

    public function destroy(Product $product)
    {
        try {
            $paths = $product->images()->pluck('path')->toArray();

            $product->delete();

            if (!empty($paths)) {
                Storage::disk('public')->delete($paths);
            }

            return back()->with('success', 'Xóa sản phẩm thành công');
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return back()->with('error', 'Không thể xóa vì sản phẩm đang có sản phẩm liên quan');
            }

            throw $e;
        }
    }
}
