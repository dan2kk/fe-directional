"use client"
import styles from "@/styles/Home.module.css";
import Input from "@/components/Input";
import { Select } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import useInput from "@/hooks/useInput";
import { updatePost } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { bodyValidator, tagValidator, titleValidator } from "@/lib/input";
import { Category } from "@/types/api";

export default function create() {
    const router = useRouter();
    const inputTitle = useInput("", titleValidator);
    const inputBody = useInput("", bodyValidator);
    const inputTags = useInput("", tagValidator);
    const [category, setCategory] = useState<Category>(Category.NOTICE);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputTitle.validate() || !inputBody.validate() || !inputTags.validate()) {
            return;
        }
        const tags = inputTags.value.split(',');
        const uniqueTags = [...new Set(tags)];
        updatePost({ title: inputTitle.value, body: inputBody.value, category: category, tags: uniqueTags }).then((res) => {
            router.push('/crud');
        }).catch((err) => {
            console.log(err);
        })
    }, [inputTitle, inputBody, inputTags, category, router]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!localStorage.getItem('token')) {
                alert("로그인이 필요한 기능입니다.");
                router.push('/crud');
            }
        }
    }, [window])

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>글쓰기</h1>
                <form onSubmit={onSubmit}>
                    <Input
                        type="text"
                        label="제목"
                        value={inputTitle.value}
                        onChange={inputTitle.onChange}
                        error={inputTitle.error}
                    />
                    <Input
                        type="text"
                        label="내용"
                        value={inputBody.value}
                        onChange={inputBody.onChange}
                        error={inputBody.error}
                    />
                    <Select
                        label="카테고리"
                        placeholder="카테고리를 선택해주세요"
                        data={[
                            { value: Category.NOTICE, label: 'NOTICE' },
                            { value: Category.QNA, label: 'QNA' },
                            { value: Category.FREE, label: 'FREE' },
                        ]}
                        defaultValue={category}
                        onChange={(value) => setCategory(value as Category)}
                    />
                    <Input
                        type="text"
                        label="태그"
                        value={inputTags.value}
                        onChange={inputTags.onChange}
                        error={inputTags.error}
                    />
                    <button type="submit">글쓰기</button>
                </form>
            </main>
        </div>
    );
}
