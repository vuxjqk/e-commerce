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
import { slugify } from '@/lib/utils';
import { Form } from '@inertiajs/react';
import { Edit2 } from 'lucide-react';
import { useRef } from 'react';

export default function Edit({ formConfig, brand }) {
    const closeBtnRef = useRef(null);
    const slugRef = useRef(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon-xs">
                    <Edit2 className="text-yellow-500" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cập nhật thương hiệu</DialogTitle>

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
                                    defaultValue={brand.name}
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
                                    defaultValue={brand.slug}
                                    placeholder="Slug"
                                    ref={slugRef}
                                />

                                <InputError message={errors.slug} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="logo" className="sr-only">
                                    Logo
                                </Label>

                                <Input type="file" id="logo" name="logo" />

                                <InputError message={errors.logo} />
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
