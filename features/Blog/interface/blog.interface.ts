export const BlogType = ["Announcement", "Congratulate", "Blog"];
export type BlogType = (typeof BlogType)[number];
export interface IBlog {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  type: BlogType;
  tags: string;
  pin: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IBlogResponse {
  success: boolean;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    result: IBlog[];
  };
  message: string;
}

export interface IBlogGetBlogsRequest {
  page?: number;
  limit?: number;
  type?: BlogType;
  tags?: string;
  pin?: boolean;
  sort?: string;
  searchTerm?: string;
}
