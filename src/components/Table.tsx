import { useMemo, useState, useRef, useEffect } from "react";
import { MantineReactTable, MRT_ColumnFiltersState, MRT_SortingState, useMantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';
import { Category, postGetResData, postItemData } from "@/types/api";
import { useGetMyPosts } from "@/lib/query";
import { parseFilters, parseSorting } from "@/utils/tablesort";
import { Loader, Center } from '@mantine/core';
import { deleteAllPosts } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function Table() {

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
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [search, setSearch] = useState<string>('');
    const router = useRouter();
    const divRef = useRef<HTMLButtonElement>(null);
    const apiParams = useMemo(() => ({
        ...parseFilters(columnFilters),
        ...parseSorting<'createdAt' | 'title'>(sorting),
        search,
        limit: 7,
    }), [columnFilters, sorting, search]);
    const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useGetMyPosts(apiParams);

    useEffect(() => {
        if (divRef.current) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            }, { threshold: 0.5 });
            observer.observe(divRef.current);
            return () => observer.disconnect();
        }
    }, [divRef, fetchNextPage, hasNextPage]);
    const postsData = useMemo(() => data?.pages.flatMap((page) => page.items) || [], [data]);
    const myTable = useMantineReactTable({
        columns,
        data: postsData,
        enablePagination: false,
        enableColumnResizing: true,
        enableHiding: true,
        manualFiltering: true,
        manualSorting: true,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onGlobalFilterChange: setSearch,
        enableStickyHeader: true,
        mantineTableContainerProps: {
            sx: {
                maxHeight: 'calc(100vh - 200px)',
                maxWidth: '100%',
            },
        },
        mantineTableBodyRowProps: ({ row }) => ({
            onClick: () => {
                router.push("/crud/" + row.original.id);
            },
            sx: {
                cursor: 'pointer',
            },
        }),

    });
    return (
        <>
            <MantineReactTable
                table={myTable}
            />
            <button onClick={() => { deleteAllPosts().then(() => refetch()) }} ref={divRef}>모든 게시글 삭제</button>
        </>
    );
}
