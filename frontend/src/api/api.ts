import { Post } from '../entities/types';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/Posts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/Posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error(`Failed to create post: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const updatePost = async (id: number, post: Partial<Post>): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/Posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...post, id }),
  });
  if (!response.ok) {
    throw new Error(`Failed to update post: ${response.status} ${response.statusText}`);
  }
};

export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/Posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete post: ${response.status} ${response.statusText}`);
  }
};