import { User, UserPost } from '@/types/models';

export const seedPostUser = (user : User | null): UserPost[] => {
    const posts: UserPost[] = [
        { id: 71, userId: 999, title: 'Primer Post', imageUrl: '', username: user ? user?.username : 'Franco'},
        { id: 73, userId: 999, title: 'El Gran Post', imageUrl: '', username: user ? user?.username : 'Franco'},
        { id: 28, userId: 999, title: 'Post de Foto', imageUrl: '', username: user ? user?.username : 'Franco'},
        { id: 45, userId: 999, title: 'Otro Post Genial', imageUrl: '', username: user  ? user?.username  : 'Franco'},
        { id: 54, userId: 999, title: 'Post Sencillo', imageUrl: '', username: user ? user?.username : 'Franco'},
        { id: 65, userId: 999, title: 'Explorando', imageUrl: '', username: user ? user?.username : 'Franco'},
        { id: 97, userId: 999, title: 'Post con Título Largo', imageUrl: '', username: user ? user?.username : 'Franco'}
    ];

    return posts;
};