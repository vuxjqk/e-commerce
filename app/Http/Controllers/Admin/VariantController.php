<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VariantController extends Controller
{
    public function index(Product $product)
    {
        $product->load('variants');
        return Inertia::render('admin/variants/index', compact('product'));
    }

    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $product->variants()->create($validated);

        return back()->with('success', 'Thêm biến thể thành công');
    }

    public function update(Request $request, Variant $variant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $variant->update($validated);

        return back()->with('success', 'Cập nhật biến thể thành công');
    }

    public function destroy(Variant $variant)
    {
        try {
            $variant->delete();
            return back()->with('success', 'Xóa biến thể thành công');
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return back()->with('error', 'Không thể xóa vì biến thể đang có đơn hàng liên quan');
            }

            throw $e;
        }
    }
}
