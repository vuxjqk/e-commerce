import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProductController from '@/actions/App/Http/Controllers/Admin/ProductController';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { index, show } from '@/routes/adminproducts';
import DeleteModal from '@/components/delete-modal';
import Edit from './edit';
import Create from './create';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
    const { products, brands, filters } = usePage().props;

    return (
        <>
            <Head title="Sản phẩm" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form {...ProductController.index.form()}>
                    <Input
                        type="search"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Tìm kiếm..."
                    />
                </Form>

                <div className="text-end">
                    <Create
                        formConfig={ProductController.store.form()}
                        brands={brands}
                    />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Tên</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.data.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>#{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.slug}</TableCell>
                                <TableCell
                                    className={
                                        product.is_active
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }
                                >
                                    {product.is_active
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </TableCell>
                                <TableCell className="space-x-1">
                                    <Link href={show(product.id)}>
                                        <Button
                                            variant="outline"
                                            size="icon-xs"
                                        >
                                            <Eye className="text-blue-500" />
                                        </Button>
                                    </Link>
                                    <Edit
                                        formConfig={ProductController.update.form(
                                            product.id,
                                        )}
                                        product={product}
                                        brands={brands}
                                    />
                                    <DeleteModal
                                        formConfig={ProductController.destroy.form(
                                            product.id,
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={products.prev_page_url} />
                        </PaginationItem>
                        {products.links
                            .filter((link) => !isNaN(link.label))
                            .map((link) => (
                                <PaginationItem key={link.label}>
                                    <PaginationLink
                                        href={link.url}
                                        isActive={link.active}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        <PaginationItem>
                            <PaginationNext href={products.next_page_url} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
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
    ],
};
