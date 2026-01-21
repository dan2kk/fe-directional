import { useMemo, useState, useRef, useEffect } from "react";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Category, postGetResData, postItemData } from "@/types/api";
import { useGetPosts } from "@/lib/query";


export default function MockTable() {
    const [page, setPage] = useState<number>(2);
    const divRef = useRef<HTMLDivElement>(null);
    const columns = useMemo<MRT_ColumnDef<postItemData>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableSorting: false,
                enableColumnFilter: false
            },
            {
                accessorKey: 'userId',
                header: '작성자 ID',
                enableSorting: false,
                enableColumnFilter: false
            },
            {
                accessorKey: 'title',
                header: '제목',
                enableSorting: true,
                enableColumnFilter: false,
            },
            {
                accessorKey: 'body',
                header: '본문',
                enableSorting: false,
                enableColumnFilter: false
            },
            {
                accessorKey: 'category',
                header: '카테고리',
                enableSorting: false,
                filterVariant: 'select',
                mantineFilterSelectProps: {
                    data: Object.values(Category).map((status) => ({
                        label: status,
                        value: status,
                    })),
                },
            },
            {
                accessorKey: 'tags',
                header: '태그',
                enableSorting: false,
                enableColumnFilter: false,
                accessorFn: (row) => '#' + row.tags.join(' #'),
            },
            {
                accessorKey: 'createdAt',
                header: '생성일',
                enableSorting: true,
                enableColumnFilter: false
            },
        ],
        [],
    );
    const { data, isLoading, fetchNextPage, hasNextPage } = useGetPosts(20);
    const postsData = useMemo(() => data?.pages.flatMap((page) => page.items) || [], [data]);
    const myTable = useMantineReactTable({
        columns,
        data: postsData,
        enablePagination: false,
        enableColumnResizing: true,
        enableHiding: true,
    });
    useEffect(() => {
        if (divRef.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    console.log('intersecting');
                    fetchNextPage();
                }
            });
            observer.observe(divRef.current);
        }
    }, [divRef])

    return (
        <div style={{ height: '100vh' }}>
            <MantineReactTable
                table={myTable}
            />
            <div ref={divRef}>  </div>
        </div>
    );
}