"use client"
import styles from "@/styles/Post.module.css";
import { Select } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import useInput from "@/hooks/useInput";
import { updatePost } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { bodyValidator, titleValidator } from "@/lib/input";
import { Category } from "@/types/api";

export default function Create() {
    const router = useRouter();
    const inputTitle = useInput("", titleValidator);
    const inputBody = useInput("", bodyValidator);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const [category, setCategory] = useState<Category>(Category.NOTICE);

    const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmed = tagInput.trim();
            if (trimmed && !tags.includes(trimmed)) {
                setTags([...tags, trimmed]);
            }
            setTagInput("");
        } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
            setTags(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputTitle.validate() || !inputBody.validate() || tags.length === 0 || tags.length > 4) {
            alert(inputTitle.error || inputBody.error || "태그는 1개 이상 3개 이하로 입력해주세요");
            return;
        }

        updatePost({
            title: inputTitle.value,
            body: inputBody.value,
            category: category,
            tags: tags
        }).then((res) => {
            router.push('/crud');
        }).catch((err) => {
            console.error(err);
            alert("글 작성에 실패했습니다.");
        });
    }, [inputTitle.value, inputBody.value, category, tags, router]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!sessionStorage.getItem('token')) {
                alert("로그인이 필요한 기능입니다.");
                router.push('/crud');
            }
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <div className={styles.metaSection}>
                    <Select
                        placeholder="카테고리 선택"
                        data={[
                            { value: Category.NOTICE, label: 'NOTICE' },
                            { value: Category.QNA, label: 'QNA' },
                            { value: Category.FREE, label: 'FREE' },
                        ]}
                        value={category}
                        onChange={(value) => setCategory(value as Category)}
                        styles={{ input: { border: 'none', backgroundColor: '#f8f9fa', fontWeight: 500 } }}
                    />
                </div>

                <input
                    type="text"
                    className={styles.titleInput}
                    placeholder="제목을 입력하세요"
                    value={inputTitle.value}
                    onChange={inputTitle.onChange}
                />

                <textarea
                    className={styles.bodyTextarea}
                    placeholder="본문"
                    value={inputBody.value}
                    onChange={inputBody.onChange}
                />

                <div className={styles.tagContainer}>
                    <span className={styles.tagLabel}>태그</span>
                    {tags.map(tag => (
                        <span key={tag} className={styles.tagBubble} onClick={() => removeTag(tag)}>
                            # {tag}
                        </span>
                    ))}
                    <input
                        type="text"
                        className={styles.tagInput}
                        placeholder="태그 입력 (엔터)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={onTagKeyDown}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    등록하기
                </button>
            </form>
        </div>
    );
}
