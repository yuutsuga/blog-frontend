"use client";

import { signIn } from "@/services/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserLogin = () => {
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const router = useRouter();

    async function handleLogin() {
        if(!email || !password)
            return;
        
        try {
            const response = await signIn(email, password);
            const data = await response.json();

            console.log(data)

            if(data.token) {
                localStorage.setItem('token', data.token)
                router.push('/pages/posts')
            }
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="bg-neutral-800/70 flex items-center justify-center h-screen">
            <div className="w-96 p-6 shadow-lg bg-white rounded-lg border-indigo-700 border-4">
                <h2 className="text-3xl block text-center font-semibold text-gray-800">Sign In</h2>

                <div className="mt-5">
                    <label htmlFor="login-email" className="text-gray-800 block text-base mb-2">Email</label>
                    <input type="email" value={email} onChange={(e) => getEmail(e.target.value)} required 
                    className="text-gray-800 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600
                    hover:bg-neutral-400/75 transition duration-300 bg-neutral-300" 
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="login-password" className="text-gray-800 block text-base mb-2">Password</label>
                    <input type="password" value={password} onChange={(e) => getPassword(e.target.value)} required 
                    className="text-gray-800 border rounded-lg w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 
                    hover:bg-neutral-400/75 transition duration-300 bg-neutral-300" 
                    />
                </div>

                <button onClick={handleLogin} 
                className="text-black border-2 bg-indigo-700 border-indigo-700 py-1 w-full rounded-md 
                hover:bg-transparent hover:text-indigo-700 hover:font-semibold font-semibold mt-5 transition duration-300"
                >
                    Sign In
                </button>
                <Link href={'/pages/register'} className="text-indigo-700 mt-2 flex">Creat an account</Link>
            </div>
        </div>
    );
}

export default UserLogin;
