import { Form, Head, Link, usePage } from '@inertiajs/react';
import { index, show } from '@/routes/adminproducts';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SelectLabel } from '@radix-ui/react-select';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { slugify } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import ImageController from '@/actions/App/Http/Controllers/Admin/ImageController';
import { Star, Upload } from 'lucide-react';
import DeleteModal from '@/components/delete-modal';
import { index as variantIndex } from '@/routes/adminvariants';

export default function Show() {
    const { product, brands } = usePage().props;
    const slugRef = useRef(null);

    return (
        <>
            <Head title="Sản phẩm" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-x-4">
                    <Button size="sm">Chi tiết</Button>

                    <Button size="sm" variant="ghost">
                        <Link href={variantIndex(product.id)}>Biến thể</Link>
                    </Button>
                </div>

                <Form
                    {...ProductController.update.form(product.id)}
                    options={{
                        preserveScroll: true,
                    }}
                    className="grid space-y-6 space-x-4 rounded-md bg-sidebar p-4 md:grid-cols-2"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="brand_id">Thương hiệu</Label>

                                <Select
                                    name="brand_id"
                                    defaultValue={String(product.brand_id)}
                                >
                                    <SelectTrigger
                                        id="brand_id"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Chọn thương hiệu" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Thương hiệu
                                            </SelectLabel>
                                            {brands.map((brand) => (
                                                <SelectItem
                                                    key={brand.id}
                                                    value={String(brand.id)}
                                                >
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <InputError message={errors.brand_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Tên</Label>

                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={product.name}
                                    placeholder="Tên"
                                    onChange={(e) => {
                                        slugRef.current.value = slugify(
                                            e.target.value,
                                        );
                                    }}
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>

                                <Input
                                    id="slug"
                                    name="slug"
                                    defaultValue={product.slug}
                                    placeholder="Slug"
                                    ref={slugRef}
                                />

                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="is_active">Trạng thái</Label>

                                <Select
                                    name="is_active"
                                    defaultValue={String(product.is_active)}
                                >
                                    <SelectTrigger
                                        id="is_active"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Trạng thái
                                            </SelectLabel>
                                            <SelectItem value="1">
                                                Hoạt động
                                            </SelectItem>
                                            <SelectItem value="0">
                                                Không hoạt động
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <InputError message={errors.is_active} />
                            </div>

                            <div className="grid gap-2 md:col-span-2">
                                <Label htmlFor="description">Mô tả</Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={product.description}
                                    placeholder="Mô tả"
                                />

                                <InputError message={errors.description} />
                            </div>

                            <div>
                                <Button disabled={processing} type="submit">
                                    Cập nhật
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-y-6 rounded-md bg-sidebar p-4">
                    <Form
                        {...ImageController.store.form(product.id)}
                        options={{
                            preserveScroll: true,
                        }}
                        resetOnSuccess
                        className="grid space-y-6 space-x-4 md:grid-cols-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="images">Ảnh</Label>

                                    <Input
                                        type="file"
                                        id="images"
                                        name="images[]"
                                        multiple
                                    />

                                    <InputError message={errors.images} />
                                    {Object.entries(errors)
                                        .filter(([key]) =>
                                            key.startsWith('images.'),
                                        )
                                        .map(([key, value]) => (
                                            <InputError
                                                key={key}
                                                message={value}
                                            />
                                        ))}
                                </div>

                                <div className="md:mt-5.5">
                                    <Button disabled={processing} type="submit">
                                        <Upload />
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="flex flex-wrap gap-4">
                        {product.images.map((image) => (
                            <div
                                key={image.id}
                                className={`group relative w-32 overflow-hidden rounded-md ${image.is_main ? 'ring-2 ring-yellow-500' : ''}`}
                            >
                                <img
                                    src={image.url}
                                    alt={image.path}
                                    className="h-full w-full object-cover transition duration-300 group-hover:blur-sm"
                                />

                                <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 transition group-hover:opacity-100">
                                    <Form
                                        {...ImageController.setMain.form(
                                            image.id,
                                        )}
                                        options={{
                                            preserveScroll: true,
                                        }}
                                    >
                                        {({ processing }) => (
                                            <Button
                                                variant="outline"
                                                size="icon-xs"
                                                disabled={processing}
                                            >
                                                <Star className="text-green-500" />
                                            </Button>
                                        )}
                                    </Form>

                                    <DeleteModal
                                        formConfig={ImageController.destroy.form(
                                            image.id,
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Quản lý sản phẩm',
            href: index(),
        },
        {
            title: 'Chi tiết sản phẩm',
            href: show(0),
        },
    ],
};
