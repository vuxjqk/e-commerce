import { Form } from '@inertiajs/react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Trash } from 'lucide-react';
import { useRef } from 'react';

export default function DeleteModal({ formConfig }) {
    const closeBtnRef = useRef(null);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon-xs">
                    <Trash className="text-red-500" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Bạn có chắc chắn muốn xóa mục này không?
                </DialogTitle>

                <Form
                    {...formConfig}
                    options={{
                        preserveScroll: true,
                        onSuccess: () => closeBtnRef.current?.click(),
                    }}
                >
                    {({ processing }) => (
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button ref={closeBtnRef} variant="secondary">
                                    Hủy
                                </Button>
                            </DialogClose>

                            <Button
                                variant="destructive"
                                disabled={processing}
                                asChild
                            >
                                <button type="submit">Xóa</button>
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
