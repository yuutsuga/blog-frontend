"use client";

import { signUp } from "@/services/api";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const UserRegister = () => {
    const [name, getName] = useState('');
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const router = useRouter();

    function handleLogout() {
        signUp(name, email, password)
        router.push('/pages/posts')
    }

    return (
        <div className="bg-neutral-800/70 flex items-center justify-center h-screen">
            <div className="w-96 p-6 shadow-lg rounded-lg bg-white border-indigo-700 border-4">
                <h2 className="text-center font-semibold block text-3xl text-gray-800">Sign Up</h2>

                <div className="mt-5">
                    <label htmlFor="register-name" className="text-gray-800 text-base mb-2 block">Name</label>
                    <input type="text" value={name} onChange={(e) => getName(e.target.value)} required 
                    className="text-gray-800 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                    hover:bg-gray-400/75 transition duration-300" 
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="register-email" className="text-gray-800 text-base mb-2 block">Email</label>
                    <input type="text" value={email} onChange={(e) => getEmail(e.target.value)} required 
                    className="text-gray-800 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                    hover:bg-gray-400/75 transition duration-300" 
                    />
                </div>

                <div className="mt-5">
                    <label htmlFor="register-password" className="text-gray-800 text-base mb-2 block">Password</label>
                    <input type="password" value={password} onChange={(e) => getPassword(e.target.value)} required 
                    className="text-gray-800 border rounded-lg py-1 px-2 w-full text-base focus:outline-none focus:ring-0 focus:border-gray-700
                    hover:bg-gray-400/75 transition duration-300" 
                    />
                </div>

                <button onClick={handleLogout} 
                className="mt-5 rounded-lg text-black border-2 border-indigo-700 bg-indigo-700 py-1 w-full 
                hover:bg-transparent hover:text-indigo-700 hover:font-semibold transition duration-500"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default UserRegister;
