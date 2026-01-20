"use client"
import styles from "@/styles/Home.module.css";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import useInput from "@/hooks/useInput";
import { authLogin } from "@/lib/axios";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { emailValidator, passwordValidator } from "@/lib/input";
import Table from "@/components/Table";
import MockTable from "@/components/Mocktable";

export default function crud() {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
    }, []);

    const inputId = useInput(process.env.NEXT_PUBLIC_API_DEFAULT_ID, emailValidator);
    const inputPw = useInput(process.env.NEXT_PUBLIC_API_DEFAULT_PW, passwordValidator);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputId.validate() || !inputPw.validate()) {
            return;
        }
        authLogin(inputId.value, inputPw.value).then((res) => {
            localStorage.setItem('token', res.token);
            setIsLogin(true);
        }).catch((err) => {
            console.log(err);
        })
    }, [inputId, inputPw]);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>게시판 기능</h1>
                {!isLogin &&
                    <>
                        <form onSubmit={onSubmit}>
                            <Input
                                label="이메일"
                                type="email"
                                placeholder="이메일을 입력해주세요"
                                value={inputId.value}
                                onChange={inputId.onChange}
                                error={inputId.error}
                            />
                            <Input
                                label="비밀번호"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                value={inputPw.value}
                                onChange={inputPw.onChange}
                                error={inputPw.error}
                            />
                            <button type="submit">로그인</button>
                        </form>
                        <MockTable />
                    </>
                }
                {isLogin &&
                    <>
                        <button onClick={() => { localStorage.removeItem('token'); setIsLogin(false); }}>로그아웃</button>
                        <Table />
                        <button onClick={() => { router.push('/crud/create') }}>글쓰기</button>
                    </>
                }
            </main>
        </div>
    );
}
