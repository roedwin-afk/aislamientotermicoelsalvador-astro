import { useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
  whatsappHref: string;
}

export default function MobileMenu({ links, whatsappHref }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md text-slate-700 hover:text-brand-red hover:bg-slate-100 focus:outline-none"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {links.map((link) => (
            
            <a  key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100">
            
            <a  href={whatsappHref}
              target="_blank"
              rel="noopener"
              className="w-full text-center py-3 bg-green-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-whatsapp"></i> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}