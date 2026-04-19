import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { slugify } from '@/lib/utils';
import { Form } from '@inertiajs/react';
import { useRef } from 'react';

export default function Create({ formConfig, brands }) {
    const closeBtnRef = useRef(null);
    const slugRef = useRef(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Thêm</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Thêm sản phẩm</DialogTitle>

                <Form
                    {...formConfig}
                    options={{
                        preserveScroll: true,
                        onSuccess: () => closeBtnRef.current?.click(),
                    }}
                    resetOnSuccess
                    className="space-y-6"
                >
                    {({ resetAndClearErrors, processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="brand_id" className="sr-only">
                                    Thương hiệu
                                </Label>

                                <Select name="brand_id">
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
                                <Label htmlFor="name" className="sr-only">
                                    Tên
                                </Label>

                                <Input
                                    id="name"
                                    name="name"
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
                                <Label htmlFor="slug" className="sr-only">
                                    Slug
                                </Label>

                                <Input
                                    id="slug"
                                    name="slug"
                                    placeholder="Slug"
                                    ref={slugRef}
                                />

                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-2">
                                <Label
                                    htmlFor="description"
                                    className="sr-only"
                                >
                                    Mô tả
                                </Label>

                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Mô tả"
                                />

                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="is_active" className="sr-only">
                                    Trạng thái
                                </Label>

                                <Select name="is_active">
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

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        ref={closeBtnRef}
                                        variant="secondary"
                                        onClick={() => resetAndClearErrors()}
                                    >
                                        Hủy
                                    </Button>
                                </DialogClose>

                                <Button disabled={processing} asChild>
                                    <button type="submit">Thêm</button>
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
