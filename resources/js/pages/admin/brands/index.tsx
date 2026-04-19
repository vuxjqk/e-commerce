import { Form, Head, usePage } from '@inertiajs/react';
import BrandController from '@/actions/App/Http/Controllers/Admin/BrandController';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { index } from '@/routes/adminbrands';
import DeleteModal from '@/components/delete-modal';
import Edit from './edit';
import Create from './create';

export default function Index() {
    const { brands, filters } = usePage().props;
    const getInitials = useInitials();

    return (
        <>
            <Head title="Thương hiệu" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form {...BrandController.index.form()}>
                    <Input
                        type="search"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Tìm kiếm..."
                    />
                </Form>

                <div className="text-end">
                    <Create formConfig={BrandController.store.form()} />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Tên</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Logo</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brands.data.map((brand) => (
                            <TableRow key={brand.id}>
                                <TableCell>#{brand.id}</TableCell>
                                <TableCell>{brand.name}</TableCell>
                                <TableCell>{brand.slug}</TableCell>
                                <TableCell>
                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={brand.logo_url}
                                            alt={brand.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(brand.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="space-x-1">
                                    <Edit
                                        formConfig={BrandController.update.form(
                                            brand.id,
                                        )}
                                        brand={brand}
                                    />
                                    <DeleteModal
                                        formConfig={BrandController.destroy.form(
                                            brand.id,
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
                            <PaginationPrevious href={brands.prev_page_url} />
                        </PaginationItem>
                        {brands.links
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
                            <PaginationNext href={brands.next_page_url} />
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
            title: 'Quản lý thương hiệu',
            href: index(),
        },
    ],
};
