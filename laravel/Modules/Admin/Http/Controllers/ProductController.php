<?php

namespace Modules\Admin\Http\Controllers;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Services\StoreService;
use Illuminate\Support\Carbon;
use App\Services\ProductService;
use Illuminate\Support\Facades\DB;
use Modules\Store\Entities\Product;
use App\Http\Controllers\Controller;
use function PHPUnit\Framework\isEmpty;
use Modules\Admin\Http\Requests\ProductRequest;
use Modules\Admin\Transformers\ProductResource;
use Modules\Admin\Http\Requests\UpdateProductRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Modules\Admin\Transformers\ProductWithOptionsResource;

class ProductController extends Controller
{
    use AuthorizesRequests;
    protected $productService, $storeService, $store;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $this->authorize('View-Product');
        $products = request()->store->products()->useFilters()->dynamicPaginate();

        return $this->responseSuccess(data: ['products' => ProductResource::collection($products)]);
    }

    public function store(ProductRequest $request)
    {
        $this->authorize('Create-Product');
        $data = $request->validated();
        $request->validateSkuIsUnique(request()->store);
        $optionsData = Arr::pull($data, 'options', []);

        return DB::transaction(function () use ($data, $optionsData) {
            $product = request()->store->products()->create($data);
            $product->uploadMedia();

            if ($optionsData != []) {
                $this->productService->createProductOptions($product, $optionsData);
            }

            return $this->responseCreated('product created', new ProductWithOptionsResource($product));
        });
    }


    public function show($productId)
    {
        $this->authorize('View-Product');
        $product = request()->store->products()->findOrFail($productId);

        return $this->responseSuccess(data: new ProductWithOptionsResource($product));
    }


    public function update(UpdateProductRequest $request, $productId)
    {
        $this->authorize('Edit-Product');
        $product = request()->store->products()->findOrFail($productId);
        $data = $request->validated();
        $request->validateSkuIsUnique(request()->store, $product);



        $optionsData = Arr::pull($data, 'options', []);

        $product->update($data);
        if (isset($data['quantity'])) {
            $product->options()->delete();
            if (!isEmpty($optionsData)) {
                $this->productService->createProductOptions($product, $optionsData);
            }
        }

        if ($request->has('sub_images')) {
            $product->clearMediaCollection('sub_images');
            foreach ($request->file('sub_images') as $file) {
                $product->addMedia($file)->toMediaCollection('sub_images');
            }
        }

        return $this->responseSuccess('Product updated', new ProductWithOptionsResource($product));
    }

    public function destroy($productId)
    {
        $this->authorize('Delete-Product');
        $product = request()->store->products()->findOrFail($productId);
        $this->productService->deleteProduct($product);

        return $this->responseSuccess('product deleted');
    }

    public function updateMainImage(Request $request, Product $product)
    {
        $request->validate([
            'main_image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048',
        ]);

        $product->clearMediaCollection('main_image');
        $product->addMediaFromRequest('main_image')->toMediaCollection('main_image');

        return $this->responseSuccess('main image updated', data: ['main_image' => $product->getFirstMediaUrl('main_image')]);
    }
}
