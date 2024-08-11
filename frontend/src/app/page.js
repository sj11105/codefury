// src/app/page.js
"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/main");
    }
  }, [session, router]);

  return (
    <main>
      <h1>Welcome to our website "XYZ"</h1>

    </main>
  );
};

export default LandingPage;
