import { Form, Head, usePage } from '@inertiajs/react';
import { index } from '@/routes/adminusers';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';

export default function Index() {
    const { users, filters } = usePage().props;
    const getInitials = useInitials();

    return (
        <>
            <Head title="Người dùng" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form {...UserController.index.form()}>
                    <Input
                        type="search"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Tìm kiếm..."
                    />
                </Form>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Thông tin</TableHead>
                            <TableHead>Liên hệ</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>#{user.id}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">
                                            {user.name}
                                        </div>
                                        <div className="text-xs">
                                            {user.email}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>Sđt: {user.phone ?? '---'}</div>
                                    <div title={user.address}>
                                        Đc:{' '}
                                        {user.address
                                            ? user.address.length > 20
                                                ? user.address.slice(0, 20) +
                                                  '...'
                                                : user.address
                                            : '---'}
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={
                                        user.is_active
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }
                                >
                                    {user.is_active
                                        ? 'Hoạt động'
                                        : 'Không hoạt động'}
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href={users.prev_page_url} />
                        </PaginationItem>
                        {users.links
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
                            <PaginationNext href={users.next_page_url} />
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
            title: 'Quản lý người dùng',
            href: index(),
        },
    ],
};
