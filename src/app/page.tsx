"use client";
import { healthCheck } from "@/lib/axios";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [health, setHealth] = useState<boolean>(false);
  useEffect(() => {
    healthCheck().then((res: any) => {
      setHealth(true);
    }).catch((err: any) => {
      setHealth(false);
    })
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>과제 기능 구현</h1>
        <div className={styles.grid}>
          <div>
            <p>Health Check</p>
            <p>{health ? "OK" : "NG"}</p>
          </div>

          <Link href="/crud" className={styles.card}>
            <h2>&larr; 게시판 페이지</h2>
            <p>게시판 페이지로 이동</p>
          </Link>
          <Link href="/chart" className={styles.card}>
            <h2>&larr; 차트 페이지</h2>
            <p>차트 페이지로 이동</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
