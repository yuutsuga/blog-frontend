'use client'

const request = (url: string, method: string = "GET", body?: object) => {


    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};

export const signIn = (email: string, password: string) => {
    return request('/user/signin', "POST", {email, password});
};

export const signUp = (name: string, email: string, password: string) => {
    return request('/user/signup', "POST", {name, email, password});
};

export const getUsers = () => {
    return request('/user/', "GET");
};

export const getUserById = () => {
    return request('/user/:id', "GET");
};

export const updatedUser = (name: string, email: string) => {
    return request('/user/update', "PUT", {name, email});
};

export const deleteUser = (userId: string) => {
    return request('/user/delete', "DELETE", {userId});
}

export const getAllPosts = () => {
    return request('/post/');
};

export const getPostById = (id: string) => {
    return request(`/post/${id}`);
};

export const createPost = (title: string, content: string) => {
    return request('/post/create', "POST", {title, content});
};

export const updatePost = (id: string, title: string, content: string) => {
    return request('/post/update', "PUT", {id, title, content});
};

export const deletePost = (id: string) => {
    return request('post/delete', "DELETE", {id});
};
