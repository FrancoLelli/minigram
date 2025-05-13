export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface UserPost {
  id: number;
  userId: number;
  title: string;
  imageUrl: string;
  username: string;
}