import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postGetMyResData, postGetReqData, postGetResData } from "@/types/api";
import { getMyPosts, getPosts } from "./axios";


export const useGetMyPosts = (params: postGetReqData) => {
    return useInfiniteQuery<postGetMyResData>({
        queryKey: ['posts', params],
        initialPageParam: 1,
        queryFn: ({ pageParam }) =>
            getMyPosts({
                ...params,
                nextCursor: pageParam as string
            }),
        getNextPageParam: (lastPage) => {
            if (!lastPage.nextCursor) {
                return undefined;
            }
            return lastPage.nextCursor;
        },
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('token'),
    });
};
export const useGetPosts = (params: number) => {
    const max_limit = 500;
    return useInfiniteQuery<postGetResData>({
        queryKey: ['posts', params],
        initialPageParam: params,
        queryFn: ({ pageParam }) =>
            getPosts(pageParam as number),
        getNextPageParam: (lastPage) => {
            if (lastPage.count < max_limit) {
                return undefined;
            }
            return lastPage.count + params;
        },
    });
};