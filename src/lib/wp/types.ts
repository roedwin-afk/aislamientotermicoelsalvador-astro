export interface WPRendered {
  rendered: string;
}

export interface WPMediaDetails {
  sizes?: {
    medium?: { source_url: string };
    large?: { source_url: string };
    full?: { source_url: string };
  };
}

export interface WPFeaturedMedia {
  source_url: string;
  alt_text: string;
  media_details?: WPMediaDetails;
}

export interface WPAuthor {
  name: string;
  avatar_urls?: Record<string, string>;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  _embedded?: {
    'wp:featuredmedia'?: WPFeaturedMedia[];
    author?: WPAuthor[];
  };
}

export interface PaginatedPosts {
  posts: WPPost[];
  totalPages: number;
  totalPosts: number;
}

export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author_name: string;
  date: string;
  content: WPRendered;
}