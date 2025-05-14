import { Photo, Post, User, UserPost } from "@/types/models";

export const postUserHelper = (
  posts: Post[],
  photos: Photo[],
  users: User[]
): UserPost[] => {
  return posts.slice(0, 30).map((post, i) => ({
    id: post.id,
    title: post.title,
    imageUrl: photos[i]?.url,
    username: users.find((u) => u.id === post.userId)?.username || 'Anonimo',
    userId: users.find((u) => u.id === post.userId)?.id || 0,
  }));
};