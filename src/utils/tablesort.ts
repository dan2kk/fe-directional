import { MRT_ColumnFiltersState, MRT_SortingState } from 'mantine-react-table';

export const parseFilters = (columnFilters: MRT_ColumnFiltersState) => {
    return columnFilters.reduce((acc, filter) => {
        acc[filter.id] = filter.value;
        return acc;
    }, {} as Record<string, any>);
};

export const parseSorting = <T extends string>(sorting: MRT_SortingState) => {
    if (sorting.length === 0) return { sort: undefined, order: undefined };
    const firstSort = sorting[0];
    return {
        sort: firstSort.id as T,
        order: firstSort.desc ? 'desc' as const : 'asc' as const,
    };
};