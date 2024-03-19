export interface IPost {
    title: string;
    description: string;
    views?: number;
    likes?: number;
    dislikes?: number;
    user_id?: number;
    imagePath?: string;
  }