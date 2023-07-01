export type ContentCreator = {
    id: number;
    createdAt: string;
    name: string;
    description: string;
    image: string;
    social_media: {
        youtube?: string;
        instagram?: string;
        twitter?: string;
    }
}
