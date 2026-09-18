export const prerender = false;

import type { APIRoute } from 'astro';

const API_BASE = import.meta.env.WP_API_URL;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), { status: 400 });
  }

  const { postId, name, email, content, website } = body as {
    postId?: number;
    name?: string;
    email?: string;
    content?: string;
    website?: string; // honeypot — un usuario real nunca lo llena
  };

  // Honeypot: si viene lleno, es un bot. Respondemos "éxito" falso para no darle pistas.
  if (website) {
    return new Response(JSON.stringify({ ok: true, held: true }), { status: 200 });
  }

  // Validación server-side — nunca confiar solo en la del cliente
  if (!postId || typeof postId !== 'number') {
    return new Response(JSON.stringify({ error: 'Post inválido.' }), { status: 400 });
  }
  if (!name || name.trim().length < 2 || name.trim().length > 100) {
    return new Response(JSON.stringify({ error: 'Nombre inválido.' }), { status: 400 });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Correo inválido.' }), { status: 400 });
  }
  if (!content || content.trim().length < 5 || content.trim().length > 2000) {
    return new Response(JSON.stringify({ error: 'El comentario debe tener entre 5 y 2000 caracteres.' }), { status: 400 });
  }

  try {
    const wpRes = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post: postId,
        author_name: name.trim(),
        author_email: email.trim(),
        content: content.trim(),
      }),
    });

    if (!wpRes.ok) {
      const errBody = await wpRes.json().catch(() => null);
      const message = errBody?.message || 'WordPress rechazó el comentario.';
      return new Response(JSON.stringify({ error: message }), { status: wpRes.status });
    }

    return new Response(JSON.stringify({ ok: true, held: true }), { status: 201 });
  } catch (err) {
    console.error('Error publicando comentario en WordPress:', err);
    return new Response(JSON.stringify({ error: 'No se pudo publicar el comentario. Intentá de nuevo.' }), { status: 502 });
  }
};