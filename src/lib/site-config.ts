export const CONTACT = {
  phone: '(503) 2515-0030',
  phoneHref: 'tel:+50325150030',
  whatsapp: '50325150030',
  email: 'ventas@promaica.com',
};

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/GrupoPromaica/',
  instagram: 'https://www.instagram.com/promaica_sv/?hl=es',
  youtube: 'https://www.youtube.com/channel/UCqrOOs-_Vd9tnJFsipSEj0A',
  linkedin: 'https://sv.linkedin.com/company/promaica-el-salvador',
};

export interface Location {
  name: string;
  address: string;
  hours: string[];
}

export const LOCATIONS: Location[] = [
  {
    name: 'San Salvador',
    address: 'Calle Lorena y Calle Roma #170, San Salvador',
    hours: ['Lunes a Viernes: 8:00 a.m. - 5:00 p.m.', 'Sábado: 8:00 a.m. - 4:00 p.m.'],
  },
  {
    name: 'San Miguel',
    address: 'Carretera Panamericana, 500 metros de metrocentro. Ex local Zócalo, San Miguel',
    hours: ['Lunes a Viernes: 8:00 a.m. - 5:00 p.m.', 'Sábado: 8:00 a.m. - 12:00 p.m.'],
  },
];

export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}