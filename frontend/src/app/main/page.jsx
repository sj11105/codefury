// src/app/main/page.js
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MainPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/");
        }
    }, [session, router]);

    if (!session) return null; // Show nothing while redirecting

    return (
        <main>
            <h1>You have landed successfully!</h1>

        </main>
    );
};

export default MainPage;
