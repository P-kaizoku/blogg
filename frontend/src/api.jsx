import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// 📌 Create a new post
export const createPost = (postData) => API.post("/posts", postData);

// 📌 Get all posts
export const getPosts = () => API.get("/posts");

// 📌 Get a single post
export const getPost = (id) => API.get(`/posts/${id}`);

// 📌 Update a post
export const updatePost = (id, updatedData) => API.put(`/posts/${id}`, updatedData);

// 📌 Delete a post
export const deletePost = (id) => API.delete(`/posts/${id}`);
