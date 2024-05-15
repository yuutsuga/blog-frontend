"use client";

import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "@/services/api";
import { useState, useCallback, useEffect } from "react";

type Post = {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    updated: boolean
}

type PostProps = {
    post: Post
}

function PostCard({post}: PostProps) {
    const formatDate = useCallback((dateString: Date) => {
		const date = new Date(dateString);

		const dateText = date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
		const timeText = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

		return `${dateText} ${timeText}`;
	}, []);

    return (
        <div className="w-4/12 p-6 shadow-lg bg-white rounded-lg border-indigo-700 border-2 h-72">
            <div>
                <h2 className="bg-neutral-300 hover:bg-neutral-400/65 text-base rounded-md w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600
                transition duration-300 h-12 text-black">
                    {post.title}
                </h2>
            </div>
            <div className="mt-5">
                <p className="bg-neutral-300 hover:bg-neutral-400/65 text-base rounded-md w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 
                transition duration-300 h-20 text-black">
                    {post.content}
                </p>
            </div>
            <div>
                <p className="text-indigo-700 mt-2 flex">{formatDate(post.createdAt)}</p>
                {post.updated && <p title={formatDate(post.updatedAt)} className="text-indigo-700 mt-2 flex">(edited)</p>}
            </div>
        </div>
    )
}

const Home = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPostData = useCallback(async () => {
		setLoading(true);
		const response = await getAllPosts();
		if(!response.ok) return;
		
		const data = await response.json();

		await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
		
		setPosts(data.posts);
		setLoading(false);
	}, []);

	useEffect(() => {
		if(!posts)
			fetchPostData();
	}, [posts, fetchPostData]);

    return (
        <div className="flex justify-center grid-flow-col bg-neutral-800/70 h-screen">
            <div className="w-4/12 p-6 shadow-lg bg-white rounded-lg border-indigo-700 border-2 h-72">
                <div>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} 
                    className="bg-neutral-300 hover:bg-neutral-400/65 text-base rounded-md w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600
                    transition duration-300 h-12 text-black" 
                    required />
                </div>
                <div className="mt-5">
                    <input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} 
                    className="bg-neutral-300 hover:bg-neutral-400/65 text-base rounded-md w-full px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600
                    transition duration-300 h-20 text-black" 
                    required />
                </div>
                <div className="mt-5">
                    <button onClick={() => createPost(title, content)} 
                    className="text-black border-2 border-indigo-700 bg-indigo-700 rounded-md w-full transition duration-300 py-1 hover:bg-transparent 
                    hover:text-indigo-700 hover:font-semibold"
                    >
                        Send
                    </button>
                </div>
            </div>

            <div>
                {posts?.map((post) => 
                    <PostCard key={post.id} post={post} />
                )}
            </div>
        </div>
    );
}

export default Home;
