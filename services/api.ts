import { Photo, Post, User } from '../types/models';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getPhotos = async (): Promise<Photo[]> => {
  const res = await fetch(`${BASE_URL}/photos?_limit=30`);
  return res.json();
};

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${BASE_URL}/posts?_limit=30`);
  return res.json();
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};