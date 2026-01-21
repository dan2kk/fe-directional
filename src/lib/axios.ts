import { postGetReqData, postUpdateReqData } from '@/types/api';
import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
export const healthCheck = async () => {
    const res = await client.get(`/health`);
    return res.data;
}

export const authLogin = async (email: string, password: string) => {
    const res = await client.post(`/auth/login`, { email, password });
    return res.data;
}

export const getMyPosts = async (params: postGetReqData) => {
    const res = await client.get('/posts', { params });
    return res.data;
}

export const getPosts = async (count: number) => {
    const res = await client.get(`/mock/posts`, { params: { count } });
    return res.data;
}

export const updatePost = async (data: postUpdateReqData) => {
    const res = await client.post(`/posts`, data);
    return res.data;
}
export const deleteAllPosts = async () => {
    const res = await client.delete(`/posts`);
    return res.data;
}
export const getSinglePost = async (id: string) => {
    const res = await client.get(`/posts/${id}`);
    return res.data;
}
export const updateSinglePost = async (id: string, data: postUpdateReqData) => {
    const res = await client.patch(`/posts/${id}`, data);
    return res.data;
}
export const deleteSinglePost = async (id: string) => {
    const res = await client.delete(`/posts/${id}`);
    return res.data;
}