// src/app/page.js
"use client";
import Carousel from "./components/Caraousel";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/main");
    }
  }, [session, router]);


 
  return (
    <main>
      <h1 className="text-center text-3xl font-bold mt-[40px]">Welcome to our website "RescueNet"</h1>
    
      <div>< Carousel/></div>
      <div className="-mt-[550px] ml-[850px] w-[600px] font-bold text-xl">
        <p>Our disaster management website offers essential tools for effective emergency response. With secure user authentication, real-time geolocation tracking, and SMS alerts, users stay informed and connected. Advanced resource and disaster prediction models help optimize response efforts, while a chatbot provides instant support. Additionally, our platform facilitates community engagement through volunteer entry, making it a vital resource for managing and preparing for disasters..</p>
      </div>
    

    </main>
  );
};

export default page;
