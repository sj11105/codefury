"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Chatbot from "../components/Chatbot";
import Weather from "../components/Weather";

const page = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/");
        }
    }, [session, router]);

    if (!session) return null; // Show nothing while redirecting

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="navbar bg-[#9fb6c3] shadow-md border-b border-gray-200">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {/* Add menu items here if needed */}
                </ul>
                <li className='text-center'>
                    <Link href="/sms" className="text-black font-bold hover:text-blue-600">
                        Alert
                    </Link>
                </li>
            </div>
            <div>
                <Weather/>
            </div>

            <div className="flex flex-col items-center mt-10">
                <Link href="/volunteer">
                    <div className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-300 w-full max-w-lg mb-6">
                        <img
                            src="https://i.pinimg.com/originals/70/c3/cf/70c3cfc669a7485fcda0dd6896aec1e5.gif"
                            alt="Disaster Response"
                            className="w-full h-auto object-cover rounded-t-lg mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Join Us!</h2>
                        <p className="text-gray-600">Help people in danger by providing them what is useless for you but can be a lifesaver for them.</p>
                    </div>
                </Link>

                <img
                    src="https://i.pinimg.com/originals/03/9c/79/039c79d8b2430aa14680b5a7b627e5c0.gif"
                    alt="Disaster"
                    className="w-full max-w-lg mb-6"
                />

                <h1 className="text-4xl font-bold mb-10 text-gray-900 text-center">Disaster Management</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <Link href="/emergency-preparedness">
                        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <img
                                src="https://i.pinimg.com/originals/1d/bb/8e/1dbb8e843ebd768cc3d74370493489ac.gif"
                                alt="Emergency Preparedness"
                                className="w-full h-auto object-cover rounded-t-lg mb-4"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Resource Prediction</h2>
                            <p className="text-gray-600">Plan and prepare for disasters before they happen.</p>
                        </div>
                    </Link>

                    <Link href="/safety">
                        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <img
                                src="https://i.pinimg.com/originals/e6/fa/6b/e6fa6b92decd26328f1f3616620b3e89.gif"
                                alt="Safety Measures"
                                className="w-full h-auto object-cover rounded-t-lg mb-4"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Safety Measures</h2>
                            <p className="text-gray-600">Quick response to minimize the impact during disasters.</p>
                        </div>
                    </Link>

                    <Link href="/recovery-and-rehabilitation">
                        <div className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition duration-300">
                            <img
                                src="https://i.pinimg.com/originals/0e/ff/16/0eff163b40215ea77234778d9b15fee3.gif"
                                alt="Recovery & Rehabilitation"
                                className="w-full h-auto object-cover rounded-t-lg mb-4"
                            />
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Disaster Prediction</h2>
                            <p className="text-gray-600">Steps to recover and rebuild after a disaster.</p>
                        </div>
                    </Link>
                </div>
                <Chatbot/>
            </div>
        </main>
    );
};

export default page;
