import { UserPost } from '@/types/models';

export const seedPostUser = (): UserPost[] => {
    const posts: UserPost[] = [
        { id: 71, userId: 999, title: 'Primer Post', imageUrl: '', username: 'franco' },
        { id: 28, userId: 999, title: 'Post de Foto', imageUrl: '', username: 'franco' },
        { id: 73, userId: 999, title: 'El Gran Post', imageUrl: '', username: 'franco' },
        { id: 45, userId: 999, title: 'Otro Post Genial', imageUrl: '', username: 'franco' },
        { id: 54, userId: 999, title: 'Post Sencillo', imageUrl: '', username: 'franco' },
        { id: 65, userId: 999, title: 'Explorando', imageUrl: '', username: 'franco' },
        { id: 97, userId: 999, title: 'Post con Título Largo', imageUrl: '', username: 'franco' }
    ];

    return posts;
};