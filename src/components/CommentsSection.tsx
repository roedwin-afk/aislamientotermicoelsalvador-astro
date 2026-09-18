import { useState, type FormEvent } from 'react';

interface Comment {
  id: number;
  author_name: string;
  date: string;
  content: { rendered: string };
}

interface Props {
  postId: number;
  initialComments: Comment[];
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function CommentsSection({ postId, initialComments }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, name, email, content, website }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Ocurrió un error. Intentá de nuevo.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setContent('');
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Intentá de nuevo.');
      setStatus('error');
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Comentarios {initialComments.length > 0 && `(${initialComments.length})`}
      </h2>

      {initialComments.length === 0 ? (
        <p className="text-sm text-slate-500 mb-8">Sé el primero en comentar.</p>
      ) : (
        <ul className="space-y-6 mb-10">
          {initialComments.map((c) => (
            <li key={c.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-900 text-sm">{c.author_name}</span>
                <span className="text-xs text-slate-400">
                  {new Date(c.date).toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div
                className="text-sm text-slate-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: c.content.rendered }}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-4">Deja tu comentario</h3>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg p-4">
            <i className="fa-solid fa-circle-check mr-2"></i>
            ¡Gracias por tu comentario! Quedó pendiente de revisión y aparecerá una vez aprobado.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot — oculto visualmente, invisible para humanos, visible para bots simples */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute left-[-9999px] w-px h-px overflow-hidden"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Correo *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Comentario *</label>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={2000}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm outline-none bg-white resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-3 bg-brand-red hover:bg-brand-darkred disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition text-sm uppercase tracking-wider"
            >
              {status === 'submitting' ? 'Enviando...' : 'Publicar comentario'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}