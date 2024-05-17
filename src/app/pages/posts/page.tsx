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
        <div className="w-4/12 p-6 shadow-lg bg-white rounded-lg border-indigo-700 border-2 h-72 shadow-indigo-500">
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
                {post.updated && 
                <div title={formatDate(post.updatedAt)} className="text-indigo-700 mt-2 flex">
                    <label>
                        (edited)
                    </label>
                </div>}
            </div>
        </div>
    )
}

const Posts = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
        getAllPosts()
        .then(res => res.json())
        .then(data => setPosts(data.result))
	}, []);

    const handleDeletePost = async (post: Post) => {
            // const handleDeletePost = posts.filter(post => post.id !== postId);
            // setPosts(handleDeletePost);
            const postId = post.id;
            if (postId) {
                deletePost(postId);
            }
    }

    const deletedPost = (postId: string) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    }

    const handleEditPost = (post: Post) => {
        const postId = post.id;
        if (postId) {
            const newTitle: string = prompt('Enter the new title: ') as string;
            const newContent: string = prompt('Enter the new content: ') as string;
            updatePost(postId, newTitle, newContent);
        }
    }

    const updatePostInfo = (updatedPost: Post) => {
        setPosts(posts.map(post => 
            post.id === updatedPost.id ? updatedPost : post
        ));
    }

    if (!updatePostInfo) {
        return console.log('update failed');
    }

    return (
        <div className="flex flex-col justify-center bg-neutral-800/70 h-screen place-items-center shadow-md shadow-indigo-500">
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

            <ul className="flex flex-wrap grid-rows-6 content-center mt-3">
                {posts?.map((post) => (
                    <li key={post.id}>
                        <PostCard post={post} />            
                        <button onClick={() => handleDeletePost} className="text-black border-2 border-indigo-700 bg-indigo-700 rounded-md size-9
                        transition duration-300 py-1 hover:bg-transparent hover:text-indigo-700 hover:font-semibold mt-2 mb-1 shadow-lg shadow-indigo-500">
                            Delete
                        </button>
                        <button onClick={() => handleEditPost} className="text-black border-2 border-indigo-700 bg-indigo-700 rounded-md size-9
                        transition duration-300 py-1 hover:bg-transparent hover:text-indigo-700 hover:font-semibold mt-2 mb-1 shadow-lg shadow-indigo-500 ml-3">
                            Edit
                        </button>
                    </li>
                )
                )}
            </ul>
        </div>
    );
}

export default Posts;
