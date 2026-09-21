import type { WPPost, PaginatedPosts, WPComment } from './types';

const API_BASE = import.meta.env.WP_API_URL;

const WP_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; PromaicaAstroBot/1.0; +https://aislamientotermicoelsalvador-astro.onrender.com)',
};

export async function getPosts(page = 1, perPage = 9): Promise<PaginatedPosts> {
  const url = `${API_BASE}/posts?_embed&per_page=${perPage}&page=${page}`;
  const res = await fetch(url, { headers: WP_HEADERS });

  if (!res.ok) {
    // WordPress devuelve 400 cuando pedís una página que no existe
    if (res.status === 400) {
      return { posts: [], totalPages: 0, totalPosts: 0 };
    }
    const body = (await res.text()).slice(0, 500);
    console.error('WP status:', res.status, 'server:', res.headers.get('server'), 'url:', url);
    console.error('WP body:', body);
    throw new Error(`Error al obtener posts de WordPress: ${res.status}`);
  }

  const posts: WPPost[] = await res.json();
  const totalPages = Number(res.headers.get('X-WP-TotalPages') ?? '1');
  const totalPosts = Number(res.headers.get('X-WP-Total') ?? posts.length);

  return { posts, totalPages, totalPosts };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const url = `${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`;
  const res = await fetch(url, { headers: WP_HEADERS });

  if (!res.ok) {
    const body = (await res.text()).slice(0, 500);
    console.error('WP status:', res.status, 'server:', res.headers.get('server'), 'url:', url);
    console.error('WP body:', body);
    throw new Error(`Error al obtener el post "${slug}" de WordPress: ${res.status}`);
  }

  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export function getFeaturedImage(post: WPPost): { url: string; alt: string } | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;

  const url =
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.medium?.source_url ??
    media.source_url;

  return { url, alt: media.alt_text || post.title.rendered };
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name ?? 'PROMAICA';
}

export function formatWpDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-SV', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function getComments(postId: number): Promise<WPComment[]> {
  const url = `${API_BASE}/comments?post=${postId}&order=asc&per_page=50`;
  const res = await fetch(url, { headers: WP_HEADERS });

  if (!res.ok) {
    throw new Error(`Error al obtener comentarios del post ${postId}: ${res.status}`);
  }

  return res.json();
}