import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { index, show } from '@/routes/adminproducts';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatVND } from '@/lib/utils';
import DeleteModal from '@/components/delete-modal';
import VariantController from '@/actions/App/Http/Controllers/Admin/VariantController';
import Create from './create';
import Edit from './edit';

export default function Index() {
    const { product } = usePage().props;

    return (
        <>
            <Head title="Biến thể" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="space-x-4">
                    <Button size="sm" variant="ghost">
                        <Link href={show(product.id)}>Chi tiết</Link>
                    </Button>

                    <Button size="sm">Biến thể</Button>
                </div>

                <div className="text-end">
                    <Create
                        formConfig={VariantController.store.form(product.id)}
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>STT</TableHead>
                            <TableHead>Tên</TableHead>
                            <TableHead>Giá</TableHead>
                            <TableHead>Tồn kho</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {product.variants.map((variant, index) => (
                            <TableRow key={variant.id}>
                                <TableCell>#{index + 1}</TableCell>
                                <TableCell>{variant.name}</TableCell>
                                <TableCell className="space-x-2">
                                    {variant.sale_price && (
                                        <span className="line-through">
                                            {formatVND(variant.price)}
                                        </span>
                                    )}

                                    <span className="text-blue-500">
                                        {formatVND(variant.final_price)}
                                    </span>
                                </TableCell>
                                <TableCell>{variant.stock}</TableCell>
                                <TableCell
                                    className={
                                        variant.is_active
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }
                                >
                                    {variant.is_active
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </TableCell>
                                <TableCell className="space-x-1">
                                    <Edit
                                        formConfig={VariantController.update.form(
                                            variant.id,
                                        )}
                                        variant={variant}
                                    />
                                    <DeleteModal
                                        formConfig={VariantController.destroy.form(
                                            variant.id,
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Quản lý sản phẩm',
            href: index(),
        },
        {
            title: 'Biến thể sản phẩm',
            href: show(0),
        },
    ],
};
