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
import { Form } from '@inertiajs/react';
import { Edit2 } from 'lucide-react';
import { useRef } from 'react';

export default function Edit({ formConfig, variant }) {
    const closeBtnRef = useRef(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon-xs">
                    <Edit2 className="text-yellow-500" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cập nhật biến thể</DialogTitle>

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
                                <Label htmlFor="name" className="sr-only">
                                    Tên
                                </Label>

                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={variant.name}
                                    placeholder="Tên"
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price" className="sr-only">
                                    Giá
                                </Label>

                                <Input
                                    type="number"
                                    id="price"
                                    name="price"
                                    defaultValue={variant.price}
                                    placeholder="Giá"
                                />

                                <InputError message={errors.price} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="sale_price" className="sr-only">
                                    Giá bán
                                </Label>

                                <Input
                                    type="number"
                                    id="sale_price"
                                    name="sale_price"
                                    defaultValue={variant.sale_price}
                                    placeholder="Giá bán"
                                />

                                <InputError message={errors.sale_price} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="stock" className="sr-only">
                                    Tồn kho
                                </Label>

                                <Input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    defaultValue={variant.stock}
                                    placeholder="Tồn kho"
                                />

                                <InputError message={errors.stock} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="is_active" className="sr-only">
                                    Trạng thái
                                </Label>

                                <Select
                                    name="is_active"
                                    defaultValue={String(variant.is_active)}
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
                                    <button type="submit">Cập nhật</button>
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
