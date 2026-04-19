<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::query()
            ->when($request->search, function ($q, $search) {
                $q->whereAny(['name', 'slug'], 'LIKE', "%$search%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/brands/index', [
            'brands' => $brands,
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
            'slug' => 'required|string|max:255|unique:brands,slug',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }

        Brand::create($validated);

        return back()->with('success', 'Thêm thương hiệu thành công');
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'slug' => 'required|string|max:255|unique:brands,slug,' . $brand->id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($brand->logo) {
                Storage::disk('public')->delete($brand->logo);
            }
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }

        $brand->update($validated);

        return back()->with('success', 'Cập nhật thương hiệu thành công');
    }

    public function destroy(Brand $brand)
    {
        try {
            $logo = $brand->logo;

            $brand->delete();

            if ($logo) {
                Storage::disk('public')->delete($logo);
            }

            return back()->with('success', 'Xóa thương hiệu thành công');
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return back()->with('error', 'Không thể xóa vì thương hiệu đang có sản phẩm liên quan');
            }

            throw $e;
        }
    }
}
